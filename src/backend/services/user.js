// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import databaseConnection from "../utils/database";
import User from "../models/user";

const SECRET = process.env.JWT_SECRET

function createToken(user) {
    return jwt.sign({id: user._id ,email: user.email, name: user.name}, SECRET)
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('Token inválido')        
    }
}

export function verifyToken(token) {
    return readToken(token)
}

export async function listUsers() {
    databaseConnection();
    const usersList = await User.find();
    return usersList
}

export async function registerUser(body) {
    databaseConnection();
    const newUser = {
        email: body.email,
        name: body.name,
        password: await bcrypt.hash(body.password, 8)
    }
    const createNewUser = await User.create(newUser)
    const token = createToken(createNewUser)
    return token;
}

export async function loginUser(body) {
    databaseConnection();
    const verifyUser = await User.findOne({email: body.email})

    if(verifyUser === null) {
        throw Error("Email não encontrado.");
    } else {
        const verifyPassword = await bcrypt.compare(body.password, verifyUser.password);
        if(!verifyPassword) {
            throw Error("Senha incorreta.")
        } else {
            const token = createToken(verifyUser);
            return token;
        }        
    }
}

export async function deleteUser(id) {
    databaseConnection();
    const removeUser = await User.findByIdAndRemove(id)
    const userRemoved = {
        _id: removeUser._id,
        name: removeUser.name,
        email: removeUser.email,
        status: "deleted"
    }
    return userRemoved;
}