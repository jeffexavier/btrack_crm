import { verifyToken } from "@/src/backend/utils/token";
import {
  createGroup,
  listGroups,
  updateGroup,
  deleteGroup,
} from "@/src/backend/services/group.js";

export default async function group(req, res) {
  if (req.method === "POST") {
    try {
      const createdGroup = await createGroup(req.body);
      res.status(201).json(createdGroup);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const {id, id_legacy} = req.query
      const listedGroups = await listGroups(id, id_legacy);
      const responseListedGroups = {
        value: listedGroups,
        count: listedGroups.length ? (listedGroups.length) + 1 : (0 + 1) 
      };
      res.status(200).json(responseListedGroups);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, id_legacy } = req.query;
      const updatedGroup = await updateGroup(id, id_legacy, req.body);
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedGroup = await deleteGroup(id);
      res.status(200).json(deletedGroup);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
