import { Request, Response } from 'express';
import db from '../models';

const Address = db.address;

export const viewAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const addresses = await Address.findAll({ where: { user_id: req.body.userId } });
        res.status(200).json(addresses);
    } catch (err: any) {
        console.error(`Error retrieving addresses: ${err.message}`);
        res.status(500).json({ error: 'An error occurred while retrieving addresses.' });
    }
};

export const addAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, name, address, pinCode, town, city, state } = req.body;

        const newAddress = {
            user_id: userId,
            name,
            address,
            pinCode,
            town,
            city,
            state,
        };

        await Address.create(newAddress);
        res.status(201).json({ message: 'Address added successfully.' });
    } catch (err: any) {
        console.error(`Error adding address: ${err.message}`);
        res.status(400).json({ error: 'Failed to add address. Please check the input data.' });
    }
};

export const removeAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const { addressId, userId } = req.body;

        const result = await Address.destroy({ where: { address_id: addressId, user_id: userId } });

        if (result) {
            res.status(200).json({ message: 'Address deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Address not found or does not belong to the user.' });
        }
    } catch (err: any) {
        console.error(`Error removing address: ${err.message}`);
        res.status(500).json({ error: 'An error occurred while deleting the address.' });
    }
};
