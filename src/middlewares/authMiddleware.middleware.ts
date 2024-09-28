// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
import { NewRequestInterface } from '../types';
dotenv.config();
export const authMiddleware = (req: NewRequestInterface, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify token (replace with actual token verification logic)
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
