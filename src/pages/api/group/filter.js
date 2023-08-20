import { listFilteredGroups } from "@/src/backend/services/group.js"

export default async function filterGroup(req, res){
  if(req.method === "GET") {
    
    const {filter} = req.query
    
    console.log(filter)
    // const filteredListGroup = await listFilteredGroups(filter)

    res.status(200).json(filter)
  
  
  
  }else {
    res.status(400).json('Método inválido.')
  }
}