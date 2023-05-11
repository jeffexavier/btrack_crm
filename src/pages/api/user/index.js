import { listUsers, deleteUser } from "@/src/backend/services/user.js"

export default async function user(req, res) {
  if(req.method === "GET") {
    const usersList = await listUsers();
    res.status(200).json(usersList);
  } else if(req.method === "DELETE") {
    const { id } = req.query
    const userDeleted = await deleteUser(id)
    res.status(200).json(userDeleted)
  }
}