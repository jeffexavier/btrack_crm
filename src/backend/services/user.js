// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import User from "../models/user";
import Profile from "../models/profile"

import { createToken } from "@/src/backend/utils/token";

export async function listUsers() {
    databaseConnection();
    const usersList = await User.find().populate('profile');
    return usersList;
}

export async function registerUser(body) {
    databaseConnection();
    const newUser = {
        email: body.email,
        name: body.name,
        profile: await Profile.findOne({name: body.profile || "Admin"}),
        password: await bcrypt.hash(body.password, 8)
    };
    const createNewUser = await User.create(newUser);
    const token = createToken(createNewUser);
    return token;
}

export async function updateUser(id, body) {
    databaseConnection();
    const user = await User.findByIdAndUpdate(id, {...body, profile: await Profile.findOne({name: body.profile})});
    const updatedUser = await User.findById(user._id).populate('profile')
    return updatedUser;
  }

export async function loginUser(body) {
    databaseConnection();
    const verifyUser = await User.findOne({email: body.email});

    if(verifyUser === null) {
        throw Error("Email não encontrado.");
    } else {
        const verifyPassword = await bcrypt.compare(body.password, verifyUser.password);
        if(!verifyPassword) {
            throw Error("Senha incorreta.");
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