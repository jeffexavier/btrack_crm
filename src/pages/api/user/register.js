import { register } from "@/src/backend/services/user"

export default async function register(req, res) {
    const register = await register(req.body)
    res.status(201).json(register)
}