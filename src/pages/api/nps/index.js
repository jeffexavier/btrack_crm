import { verifyToken } from "@/src/backend/utils/token";
import {
  createNps,
  listNps,
  updateNps,
  deleteNps,
} from "@/src/backend/services/nps.js";

export default async function nps(req, res) {
  if (req.method === "POST") {
    try {
      const createdNps = await createNps(req.body);
      res.status(201).json(createdNps);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const {id, id_legacy} = req.query
      const listedNpss = await listNps(id, id_legacy);
      const responseListedNpss = {
        value: listedNpss,
        count: listedNpss.length ? (listedNpss.length) : 0 
      };
      res.status(200).json(responseListedNpss);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, id_legacy } = req.query;
      const updatedNps = await updateNps(id, id_legacy, req.body);
      res.status(200).json(updatedNps);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedNps = await deleteNps(id);
      res.status(200).json(deletedNps);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
