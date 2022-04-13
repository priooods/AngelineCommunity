import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import dotenv from 'dotenv';
import { User } from '@prisma/client';
dotenv.config()

export function generateToken(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret', {
        expiresIn: '24h'
    })
}

export function hashToken(token: any) {
    return crypto.createHash('sha512').update(token).digest('hex');
}

export default { generateToken, hashToken };