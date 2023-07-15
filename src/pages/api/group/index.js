
import { verifyToken} from '@/src/backend/utils/token'
import { createGroup, listGroups, deleteGroup } from "@/src/backend/services/group.js"

export default async function group(req, res) {
  if(req.method === "POST"){
    try {
      const createdGroup = await createGroup(req.body)    
      res.status(201).json(createdGroup)    
    } catch (error) {
      res.status(400).json(error)
    }
  } else if(req.method === "GET"){
    try {
      const listedGroups = await listGroups()

      const responseListedGroups = {
        value: listedGroups,
        count: listedGroups.length
      }
      res.status(200).json(responseListedGroups)     
    } catch (error) {
      res.status(400).json(error)
    }
  } else if(req.method === "PUT"){

  }else if(req.method === "DELETE"){
    try {
      const {id} = req.query
      const deletedGroup = await deleteGroup(id)
      res.status(200).json(deletedGroup)
      
    } catch (error) {
      res.status(400).json(error)
    }
  }
}