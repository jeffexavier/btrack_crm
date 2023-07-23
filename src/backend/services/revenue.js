// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Revenue from "../models/revenue";

import { createToken } from "@/src/backend/utils/token";

export async function listRevenues(id, id_legacy) {
  databaseConnection();
  if(id){
    const revenue = await Revenue.findById(id);
    return revenue;
  } else if(id_legacy){
    const revenue = await Revenue.findOne({id_legacy});
    return revenue;
  }

  const listRevenues = await Revenue.find();
  return listRevenues;
}

export async function createRevenue(body) {
  await databaseConnection();
  const newRevenue = body
  const createNewRevenue = await Revenue.create(newRevenue);
  return createNewRevenue
}

export async function updateRevenue(id, id_legacy, body) {
  databaseConnection();
  if(id) {
    const revenue = await Revenue.findByIdAndUpdate(id, {...body, dt_update: new Date()});
    const updatedRevenue = await Revenue.findById(revenue._id)
    return updatedRevenue;
  }
  const revenue = await Revenue.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date()});
  const updatedRevenue = await Revenue.findById(revenue._id)
  return updatedRevenue;
}

export async function deleteRevenue(id) {
  databaseConnection();
  const deleteRevenue = await Revenue.findByIdAndDelete(id);
  const deletedRevenue = {
    _id: deleteRevenue._id,
    id_legacy: deleteRevenue.id_legacy,
    name_contract: deleteRevenue.name_contract,
    contract_cnpj: deleteRevenue.contract_cnpj,
    status: "deleted"
  }

  return deletedRevenue
}