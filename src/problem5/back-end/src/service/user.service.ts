import { Request, Response } from 'express';
import db from '../models';

const User = db.user;
const Favorite = db.favorite;
const Products = db.products;

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (email === 'admin' && password === 'admin') {
            res.status(200).send({
                isAdmin: true,
            });
        } else {
            const existingUser = await User.findOne({ where: { email } });

            if (!existingUser) {
                res.status(404).json({ error: "User doesn't exist." });
                return;
            }

            if (password !== existingUser.password) {
                res.status(401).json({ error: 'Incorrect password.' });
                return;
            }

            const favorites = await Favorite.findAll({ where: { user_id: existingUser.user_id } });
            const favoriteProducts = await Promise.all(
                favorites.map(async (favorite: any) => {
                    return await Products.findOne({ where: { product_id: favorite.product_id } });
                }),
            );

            const responseData = {
                name: existingUser.name,
                email: existingUser.email,
                userId: existingUser.user_id,
                isAdmin: existingUser.isAdmin,
                phoneNum: existingUser.phoneNum,
                favorite: favoriteProducts,
            };

            res.status(200).json(responseData);
        }
    } catch (err: any) {
        console.error(`Error during login: ${err.message}`);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            res.status(400).json({ error: 'The email already exists.' });
            return;
        }

        const newUser = await User.create({
            name,
            email,
            password,
            isAdmin: false,
        });

        const responseData = {
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        };

        res.status(201).json(responseData);
    } catch (err: any) {
        console.error(`Error during signup: ${err.message}`);
        res.status(500).json({ error: 'An error occurred during signup.' });
    }
};

export const updateInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, email, phoneNum, name } = req.body;

        const result = await User.update({ email, phoneNum, name }, { where: { user_id } });

        if (result[0] === 0) {
            res.status(404).json({ error: 'User not found or no updates made.' });
            return;
        }

        res.status(200).json({ message: 'User information updated successfully.' });
    } catch (err: any) {
        console.error(`Error updating user info: ${err.message}`);
        res.status(500).json({ error: 'Failed to update user information.' });
    }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const result = await User.update({ password }, { where: { email } });

        if (result[0] === 0) {
            res.status(404).json({ error: 'User not found or no updates made.' });
            return;
        }

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err: any) {
        console.error(`Error changing password: ${err.message}`);
        res.status(500).json({ error: 'Failed to update password.' });
    }
};
