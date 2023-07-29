// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Comment from "../models/comment";

import { createToken } from "@/src/backend/utils/token";

export async function createComment(body) {
  await databaseConnection();
    const newComment = body
    const createNewComment = await Comment.create(newComment);

    if(body.parent) {
      const parent = await Comment.findById(body.parent)
      parent.children.push(createNewComment._id)
      await parent.save()
    }

    return createNewComment     
}

export async function listComments(id) {
  databaseConnection();
  if(id){
    const comment = await Comment.findById(id).populate('children').populate('parent');
    return comment;
  }
  const listComments = await Comment.find().populate("children").populate('parent');
  return listComments;
}

export async function updateComment(id, body) {
  databaseConnection();
  if(id) {
    const comment = await Comment.findByIdAndUpdate(id, {...body, dt_update: new Date()});
    const updatedComment = await Comment.findById(comment._id)
    return updatedComment;
  }
  const comment = await Comment.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date()});
  const updatedComment = await Comment.findById(comment._id)
  return updatedComment;
}

export async function deleteComment(id) {
  try {
    databaseConnection();
    const deleteComment = await Comment.findByIdAndDelete(id);
    const deletedComment = {
      _id: deleteComment._id,
      id_legacy: deleteComment.id_legacy,
      name_contract: deleteComment.name_contract,
      contract_cnpj: deleteComment.contract_cnpj,
      status: "deleted"
    }  
    return deletedComment    
  } catch (error) {
    return error
  }
}