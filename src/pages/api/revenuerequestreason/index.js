import { verifyToken } from "@/src/backend/utils/token";
import {
  createRevenueRequestReason,
  listRevenueRequestReasons,
  updateRevenueRequestReason,
  deleteRevenueRequestReason,
} from "@/src/backend/services/revenueRequestReason.js";

export default async function revenueRequestReason(req, res) {
  if (req.method === "POST") {
    try {
      const createdRevenueRequestReason = await createRevenueRequestReason(req.body);
      res.status(201).json(createdRevenueRequestReason);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const {id, value} = req.query
      const listedRevenueRequestReasons = await listRevenueRequestReasons(id, value);
      const responseListedRevenueRequestReasons = {
        value: listedRevenueRequestReasons,
        count: listedRevenueRequestReasons.length ? (listedRevenueRequestReasons.length) : 0
      };
      res.status(200).json(responseListedRevenueRequestReasons);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id, value } = req.query;
      const updatedRevenueRequestReason = await updateRevenueRequestReason(id, value, req.body);
      res.status(200).json(updatedRevenueRequestReason);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedRevenueRequestReason = await deleteRevenueRequestReason(id);
      res.status(200).json(deletedRevenueRequestReason);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
