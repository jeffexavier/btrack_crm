// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Comment from "../models/comment";

import { createToken } from "@/src/backend/utils/token";
import comment from "@/src/pages/api/comment/index.js";

export async function createComment(body) {
  await databaseConnection();
    const newComment = body
    const createNewComment = await Comment.create(newComment);

    if(body.parent) {
      const parent = await Comment.findById(body.parent)
      if(parent.children){
        parent.children.push(createNewComment._id)
        await parent.save()
      }
    }

    return createNewComment     
}

export async function listComments(id, id_partner, id_group, id_user, id_parent) {
  databaseConnection();

  const query = {parent: null};

  if(id) {
    query._id = id;
  }

  if(id_partner) {
  query.partner = id_partner;
  }

  if(id_group) {
    query.group = id_group;
  }

  if(id_user) {
    query.created_by = id_user;
  }

  if(id_parent) {
    query.parent = id_parent;
  }

  const listComments = await Comment.find(query).populate("children").populate('parent').populate("created_by").populate({path: 'children', populate: {path: 'created_by'}});
  // const listComments = await Comment.find(query).populate({path: 'children', populate: {path: 'created_by'}});
  return listComments;
}

export async function updateComment(id, body) {
  databaseConnection();
  if(id) {
    const comment = await Comment.findByIdAndUpdate(id, {...body, dt_update: new Date(), edited: true});
    const updatedComment = await Comment.findById(comment._id)
    return updatedComment;
  }
  const comment = await Comment.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date(), edited: true});
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