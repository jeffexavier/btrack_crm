import { verifyToken } from "@/src/backend/utils/token";
import {
  createRevenue,
  listRevenues,
  updateRevenue,
  deleteRevenue,
} from "@/src/backend/services/revenue.js";

export default async function revenue(req, res) {
  if (req.method === "POST") {
    try {
      const createdRevenue = await createRevenue(req.body);
      res.status(201).json(createdRevenue);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const {id, id_legacy, id_group} = req.query
      const listedRevenues = await listRevenues(id, id_legacy, id_group);
      const responseListedRevenues = {
        value: listedRevenues,
        count: listedRevenues.length ? (listedRevenues.length) + 1 : (0 + 1) 
      };
      res.status(200).json(responseListedRevenues);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, id_legacy } = req.query;
      const updatedRevenue = await updateRevenue(id, id_legacy, req.body);
      res.status(200).json(updatedRevenue);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedRevenue = await deleteRevenue(id);
      res.status(200).json(deletedRevenue);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
