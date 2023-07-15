
import { verifyToken} from '@/src/backend/utils/token'
import { createGroup, listGroups } from "@/src/backend/services/group.js"

export default async function group(req, res) {
  if(req.method === "POST"){
    try {
      const createdGroup = await createGroup(req.body)    
      res.status(300).json(createdGroup)    
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
  }
}