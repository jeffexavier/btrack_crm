import { loginUser } from "@/src/backend/services/user"

export default async function login(req, res) {
  try {
    const login = await loginUser(req.body)
    res.status(200).json(login)
} catch (error) {
    res.status(400).json(error.message)
}    
  }