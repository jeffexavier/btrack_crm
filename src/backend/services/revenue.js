// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Revenue from "../models/revenue";
import Group from "../models/group";

import { createToken } from "@/src/backend/utils/token";

export async function listRevenues(id, id_legacy, id_group) {
  databaseConnection();
  if(id){
    const revenue = await Revenue.findById(id).populate("group");
    return revenue;
  } else if(id_legacy){
    const revenue = await Revenue.find({id_legacy}).populate('group');
    return revenue;
  } else if(id_group){
    const revenue = await Revenue.find({group: id_group}).populate('group');
    return revenue;
  }
  const listRevenues = await Revenue.find().populate("group");
  return listRevenues;
}

export async function createRevenue(body) {
  await databaseConnection();
  const createNewRevenue = await Revenue.create({...body, group: await Group.findById(body.id_group), id_group: body.id_group});
  return createNewRevenue
}

export async function updateRevenue(id, id_legacy, id_group, body) {
  databaseConnection();
  if(id) {
    const revenue = await Revenue.findByIdAndUpdate(id, {...body, dt_update: new Date()});
    const updatedRevenue = await Revenue.findById(revenue._id).populate('group')
    return updatedRevenue;
  }
  const revenue = await Revenue.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date()});
  const updatedRevenue = await Revenue.findById(revenue._id).populate('group')
  return updatedRevenue;
}

export async function deleteRevenue(id) {
  databaseConnection();
  const deleteRevenue = await Revenue.findByIdAndDelete(id);
  const deletedRevenue = { ...deleteRevenue._doc, status: "deleted"}
  return deletedRevenue
}