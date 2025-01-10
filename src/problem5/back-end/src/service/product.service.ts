import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models';

const Product = db.products;
type ProductInsertType = {
    name: string;
    type: string;
    price: string;
    rating: string;
    description: string;
    countInStock: number;
    image_path: string;
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, price, rating, description, countInStock, imagePath } = req.body;

        const existingProduct = await Product.findOne({ where: { name } });
        if (existingProduct) {
            res.status(400).send({ message: 'The product name already exists.' });
        } else {
            const newProduct = await Product.create({
                name,
                type,
                price,
                rating,
                description,
                countInStock,
                image_path: imagePath,
            });
            res.status(200).json(newProduct);
        }
    } catch (err: any) {
        console.error(`Error creating product: ${err.message}`);
        res.status(500).json({ error: 'Failed to create product.' });
    }
};

export const view = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err: any) {
        console.error(`Error retrieving products: ${err.message}`);
        res.status(500).json({ error: 'Failed to retrieve products.' });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, name, type, price, rating, description, countInStock } = req.body;

        const product = await Product.findOne({ where: { product_id } });
        if (!product) {
            res.status(404).send({ message: 'Product not found.' });
            return;
        }

        await Product.update({ name, type, price, rating, description, countInStock }, { where: { product_id } });

        res.status(200).send({ message: 'Product updated successfully.' });
    } catch (err: any) {
        console.error(`Error updating product: ${err.message}`);
        res.status(500).json({ error: 'Failed to update product.' });
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.body;

        const product = await Product.findOne({ where: { product_id: productId } });
        if (!product) {
            res.status(404).send({ message: 'Product not found.' });
            return;
        }

        await Product.destroy({ where: { product_id: productId } });
        res.status(200).send({ message: 'Product deleted successfully.' });
    } catch (err: any) {
        console.error(`Error deleting product: ${err.message}`);
        res.status(500).json({ error: 'Failed to delete product.' });
    }
};

export const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.body;

        const results = await Product.findAll({
            where: {
                [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { type: { [Op.like]: `%${search}%` } }],
            },
        });

        res.status(200).json(results);
    } catch (err: any) {
        console.error(`Error searching products: ${err.message}`);
        res.status(500).json({ error: 'Failed to search products.' });
    }
};

export const insertProductsByType = async (): Promise<void> => {
    const productTypes = [
        {
            type: 'Pizza',
            images: [
                'https://tinyurl.com/89nkfveb',
                'https://tinyurl.com/89nkfveb',
                'https://tinyurl.com/89nkfveb',
                'https://tinyurl.com/89nkfveb',
                'https://tinyurl.com/89nkfveb',
            ],
        },
        {
            type: 'Burger',
            images: [
                'https://example.com/images/burger1.jpg',
                'https://example.com/images/burger2.jpg',
                'https://example.com/images/burger3.jpg',
                'https://example.com/images/burger4.jpg',
                'https://example.com/images/burger5.jpg',
            ],
        },
        {
            type: 'Sandwich',
            images: [
                'https://example.com/images/sandwich1.jpg',
                'https://example.com/images/sandwich2.jpg',
                'https://example.com/images/sandwich3.jpg',
                'https://example.com/images/sandwich4.jpg',
                'https://example.com/images/sandwich5.jpg',
            ],
        },
        {
            type: 'Smoothy',
            images: [
                'https://example.com/images/smoothy1.jpg',
                'https://example.com/images/smoothy2.jpg',
                'https://example.com/images/smoothy3.jpg',
                'https://example.com/images/smoothy4.jpg',
                'https://example.com/images/smoothy5.jpg',
            ],
        },
        {
            type: 'Snack',
            images: [
                'https://example.com/images/snack1.jpg',
                'https://example.com/images/snack2.jpg',
                'https://example.com/images/snack3.jpg',
                'https://example.com/images/snack4.jpg',
                'https://example.com/images/snack5.jpg',
            ],
        },
        {
            type: 'Drink',
            images: [
                'https://example.com/images/drink1.jpg',
                'https://example.com/images/drink2.jpg',
                'https://example.com/images/drink3.jpg',
                'https://example.com/images/drink4.jpg',
                'https://example.com/images/drink5.jpg',
            ],
        },
    ];

    const productsToInsert: ProductInsertType[] = [];

    try {
        const productCount = await Product.count();

        if (productCount > 0) {
            console.log('Products already exist in the database. Skipping insertion.');
            return;
        }

        productTypes.forEach(({ type, images }) => {
            images.forEach((image, index) => {
                productsToInsert.push({
                    name: `${type} Product ${index + 1}`,
                    type,
                    price: (Math.random() * 20 + 5).toFixed(2),
                    rating: (Math.random() * 5).toFixed(1),
                    description: `Delicious ${type} item ${index + 1}`,
                    countInStock: Math.floor(Math.random() * 50 + 10),
                    image_path: image,
                });
            });
        });

        const insertedProducts = await Product.bulkCreate(productsToInsert);
        console.log(`Inserted ${insertedProducts.length} products successfully.`);
    } catch (err: any) {
        console.error(`Error inserting products: ${err.message}`);
    }
};
