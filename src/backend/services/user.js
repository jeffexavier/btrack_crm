// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import databaseConnection from "../utils/database";
import User from "../models/user";

const SECRET = process.env.JWT_SECRET

function createToken(user) {
    return jwt.sign({email: user.email, name: user.name}, )
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('Token inválido')        
    }
}

function verifyToken(token) {
    return readToken(token)
}

export async function register(body) {
    databaseConnection();
    const newUser = {
        email: body.email,
        name: body.name,
        password: await bcrypt.hash(body.password, 8)
    }

    const createNewUser = await User.create(newUser)
    const token = createToken(newUser)
    return token;
}