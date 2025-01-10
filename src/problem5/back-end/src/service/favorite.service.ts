import { Request, Response } from 'express';
import db from '../models';

const Favorite = db.favorite;
const Products = db.products;

export const viewFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const favorites = await Favorite.findAll({ where: { user_id: req.body.userId } });
        const responseProducts = await Promise.all(
            favorites.map(async (favorite: any) => {
                return await Products.findOne({ where: { product_id: favorite.product_id } });
            }),
        );
        res.status(200).json(responseProducts);
    } catch (err: any) {
        console.error(`Error retrieving favorites: ${err.message}`);
        res.status(500).json({ error: 'Failed to retrieve favorites.' });
    }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.body;

        const newFavorite = {
            user_id: userId,
            product_id: productId,
        };

        await Favorite.create(newFavorite);
        res.status(201).json({ message: 'Favorite added successfully.' });
    } catch (err: any) {
        console.error(`Error adding favorite: ${err.message}`);
        res.status(400).json({ error: 'Failed to add favorite. Please check the input data.' });
    }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId } = req.body;

        const result = await Favorite.destroy({
            where: { user_id: userId, product_id: productId },
        });

        if (result) {
            res.status(200).json({ message: 'Favorite removed successfully.' });
        } else {
            res.status(404).json({ error: 'Favorite not found.' });
        }
    } catch (err: any) {
        console.error(`Error removing favorite: ${err.message}`);
        res.status(500).json({ error: 'Failed to remove favorite.' });
    }
};
