import Messages from "./Message"
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

export function Authorization(req:any, res:any, next:any) {
    const authorization = req.headers

    if (!authorization.authorization && authorization.authorization.split(" ")[0] !== "Bearer")
        return Messages(1, "Un-Authorization", res)
    else {
        try {
            const token = authorization.authorization.split(' ')[1];
            const payload = Jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret');
            req.payload = payload;
        } catch (error) {
            return Messages(1, "Un-Authorization", res)
        }
    }

    return next()
}

export default Authorization;