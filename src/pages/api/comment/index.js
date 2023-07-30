import { verifyToken } from "@/src/backend/utils/token";
import {
  createComment,
  listComments,
  updateComment,
  deleteComment,
} from "@/src/backend/services/comment.js";

export default async function comment(req, res) {
  if (req.method === "POST") {
    try {
      const createdComment = await createComment(req.body);
      res.status(201).json(createdComment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const {id, id_partner, id_group, id_user} = req.query
      const listedComments = await listComments(id, id_partner, id_group, id_user);
      const responseListedComments = {
        value: listedComments,
        count: listedComments.length ? (listedComments.length) + 1 : (0 + 1) 
      };
      res.status(200).json(responseListedComments);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const updatedComment = await updateComment(id, req.body);
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedComment = await deleteComment(id);
      res.status(200).json(deletedComment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
