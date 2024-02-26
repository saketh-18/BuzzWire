import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());

export default function verifyToken(req , res , next){
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    //else verify the token
    jwt.verify(token , process.env.SECRET_KEY , (err , decoded) => {
        if(err){
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

            console.log(decoded);
            req.user = decoded;
            next();
    })
}