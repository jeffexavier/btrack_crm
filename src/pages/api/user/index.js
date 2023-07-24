import { listUsers, deleteUser, updateUser } from "@/src/backend/services/user.js"

export default async function user(req, res) {
  try {
    if(req.method === "GET") {
      const usersList = await listUsers();
      res.status(200).json(usersList);
    } else if(req.method === "PUT"){  
      const {id} = req.query
      const userUpdated = await updateUser(id, req.body)
      res.status(200).json(userUpdated)
    } else if(req.method === "DELETE") {
      const { id } = req.query
      const userDeleted = await deleteUser(id)
      res.status(200).json(userDeleted)
    }
  } catch (error) {
    res.status(400).json(error.message)
  }

}