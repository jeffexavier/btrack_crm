import { verifyToken } from "@/src/backend/utils/token";
import {
  createPartner,
  listPartners,
  updatePartner,
  deletePartner,
} from "@/src/backend/services/partner.js";

export default async function partner(req, res) {
  if (req.method === "POST") {
    try {
      const createdPartner = await createPartner(req.body);
      res.status(201).json(createdPartner);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const {id} = req.query
      const listedPartners = await listPartners(id);
      const responseListedPartners = {
        value: listedPartners,
        count: listedPartners.length ? (listedPartners.length) + 1 : (0 + 1) 
      };
      res.status(200).json(responseListedPartners);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, id_legacy } = req.query;
      const updatedPartner = await updatePartner(id, id_legacy, req.body);
      res.status(200).json(updatedPartner);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedPartner = await deletePartner(id);
      res.status(200).json(deletedPartner);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
