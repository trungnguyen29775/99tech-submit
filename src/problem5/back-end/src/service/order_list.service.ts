import { Request, Response } from 'express';
import db from '../models';

const List = db.order_list;

export const viewList = async (req: Request, res: Response): Promise<void> => {
    try {
        const { order_id } = req.body;

        const list = await List.findAll({ where: { order_id } });
        res.status(200).json(list);
    } catch (err: any) {
        console.error(`Error retrieving list: ${err.message}`);
        res.status(500).json({ error: 'Failed to retrieve order list.' });
    }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, order_id, quantity } = req.body;

        await List.create({
            product_id,
            order_id,
            quantity,
        });

        res.status(201).json({ message: 'Product added successfully!' });
    } catch (err: any) {
        console.error(`Error adding product: ${err.message}`);
        res.status(500).json({ error: 'Failed to add product. Please check the input data.' });
    }
};

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { order_list_id } = req.body;

        const result = await List.destroy({ where: { order_list_id } });

        if (result) {
            res.status(200).json({ message: 'Product removed successfully!' });
        } else {
            res.status(404).json({ error: 'Product not found in the order list.' });
        }
    } catch (err: any) {
        console.error(`Error removing product: ${err.message}`);
        res.status(500).json({ error: 'Failed to remove product.' });
    }
};
