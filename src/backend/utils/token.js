import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET

export function createToken(user) {
  return jwt.sign({id: user._id ,email: user.email, name: user.name}, SECRET)
}

export function readToken(token) {
  try {
      return jwt.verify(token, SECRET)
  } catch (error) {
      throw new Error('Token inválido')        
  }
}

export function verifyToken(token) {
  return readToken(token)
}