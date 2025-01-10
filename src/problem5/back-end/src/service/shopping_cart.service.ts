import { Request, Response } from 'express';
import db from '../models';

const Cart = db.shopping_cart;

export const viewCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.body;

        const cart = await Cart.findAll({ where: { user_id } });
        res.status(200).json(cart);
    } catch (err: any) {
        console.error(`Error retrieving cart: ${err.message}`);
        res.status(500).json({ error: 'Failed to retrieve cart.' });
    }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { shopping_cart_id, product_id, user_id } = req.body;

        await Cart.create({
            shopping_cart_id,
            product_id,
            user_id,
        });

        res.status(201).json({ message: 'Product added to cart successfully.' });
    } catch (err: any) {
        console.error(`Error adding product to cart: ${err.message}`);
        res.status(500).json({ error: 'Failed to add product to cart.' });
    }
};

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { shopping_cart_id } = req.body;

        const result = await Cart.destroy({ where: { shopping_cart_id } });

        if (result) {
            res.status(200).json({ message: 'Product removed from cart successfully.' });
        } else {
            res.status(404).json({ error: 'Product not found in cart.' });
        }
    } catch (err: any) {
        console.error(`Error removing product from cart: ${err.message}`);
        res.status(500).json({ error: 'Failed to remove product from cart.' });
    }
};

export const completePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.body;

        const result = await Cart.destroy({ where: { user_id } });

        if (result) {
            res.status(200).json({ message: 'Payment completed. Cart cleared successfully.' });
        } else {
            res.status(404).json({ error: 'No items found in cart to clear.' });
        }
    } catch (err: any) {
        console.error(`Error completing payment: ${err.message}`);
        res.status(500).json({ error: 'Failed to complete payment.' });
    }
};
