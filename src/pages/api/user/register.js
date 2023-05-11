import { registerUser } from "@/src/backend/services/user"

export default async function register(req, res) {
    try {
        const registerNewUser = await registerUser(req.body)
        res.status(201).json(registerNewUser)
    } catch (error) {
        res.status(400).json(error.message)
    }    
}