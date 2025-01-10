import { Request, Response } from 'express';
import db from '../models';

const Order = db.order;

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            userId,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            totalPrice,
            isPaid,
            isDelivered,
            isShipped,
            deliveryDate,
        } = req.body;

        const newOrder = {
            user_id: userId,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            totalPrice,
            isPaid,
            isDelivered,
            isShipped,
            deliveryDate,
        };

        const latestOrder = await Order.create(newOrder);
        res.status(201).json(latestOrder);
    } catch (err: any) {
        console.error(`Error creating order: ${err.message}`);
        res.status(500).json({ error: 'Failed to create order.' });
    }
};

export const view = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.body;

        const orders = await Order.findAll({
            where: { user_id },
        });

        res.status(200).json(orders);
    } catch (err: any) {
        console.error(`Error retrieving orders: ${err.message}`);
        res.status(500).json({ error: 'Failed to retrieve orders.' });
    }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
    const { order_id } = req.body;

    try {
        const order = await Order.findOne({ where: { order_id } });

        if (!order) {
            res.status(404).json({ error: 'The order does not exist.' });
            return;
        }

        await Order.destroy({ where: { order_id } });

        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (err: any) {
        console.error(`Error deleting order: ${err.message}`);
        res.status(500).json({ error: 'Failed to delete order.' });
    }
};
