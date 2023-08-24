// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Group from "../models/group";
import Partner from "../models/partner";

import { createToken } from "@/src/backend/utils/token";

export async function createGroup(body) {
  await databaseConnection();
    const createNewGroup = await Group.create(body);
    if(body.partner) {
      const partner = await Partner.findById(body.partner)
      partner.groups.push(createNewGroup._id) 
      await partner.save();
    }
    console.log(createNewGroup)
    return createNewGroup;     
}

export async function listGroups(id, id_legacy) {
  databaseConnection();
  if(id){
    const group = await Group.findById(id);
    return group;
  } else if(id_legacy){
    const group = await Group.findOne({id_legacy});
    return group;
  }

  const listGroups = await Group.find();
  return listGroups;
}

export async function listFilteredGroups(body) {
  databaseConnection();

  // console.log(JSON.parse(body))
  const filter = JSON.parse(body)
  const listGroups = await Group.find(filter);
  return listGroups;
}

export async function updateGroup(id, id_legacy, body) {
  databaseConnection();
  if(id) {
    const group = await Group.findByIdAndUpdate(id, {...body, dt_update: new Date()});
    const updatedGroup = await Group.findById(group._id)
    return updatedGroup;
  }
  const group = await Group.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date()});
  const updatedGroup = await Group.findById(group._id)
  return updatedGroup;
}

export async function deleteGroup(id) {
  try {
    databaseConnection();
    const deleteGroup = await Group.findByIdAndDelete(id);
    const deletedGroup = {
      _id: deleteGroup._id,
      id_legacy: deleteGroup.id_legacy,
      name_contract: deleteGroup.name_contract,
      contract_cnpj: deleteGroup.contract_cnpj,
      status: "deleted"
    }  
    return deletedGroup    
  } catch (error) {
    return error
  }
}