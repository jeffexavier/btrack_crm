// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Partner from "../models/partner";
import Group from "../models/group.js";

import { createToken } from "@/src/backend/utils/token";

export async function createPartner(body) {
  await databaseConnection();
  const createNewPartner = await Partner.create(body);
  const groupsForPartner = await Group.countDocuments({partner: createNewPartner._id})
  const createdNewPartner = {
    ...createNewPartner._doc, business_qty: groupsForPartner }
  return createdNewPartner
}

export async function listPartners(id) {
  databaseConnection();
  if(id){
    const partner = await Partner.findById(id).populate("groups");
    const listedPartner = {
      ...partner._doc, business_qty: await Group.countDocuments({partner: partner._id})}
    return listedPartner;
  }
  
  const partners = await Partner.find().populate("groups");  

  const getGroupsOfPartners = async item => {
    const data = await Group.countDocuments({partner: item._id})
    return data
  }

  const result = await partners.map(async (item) => {
    const listGroups = await getGroupsOfPartners(item);
    return {...item._doc, business_qty: listGroups}
  })
  
  return await Promise.all(result);
}

export async function updatePartner(id, body) {
  databaseConnection();
  if(id) {
    const partner = await Partner.findByIdAndUpdate(id, {...body, dt_update: new Date()});
    const updatedPartner = await Partner.findById(partner._id)
    return updatedPartner;
  }
  const partner = await Partner.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date()});
  const updatedPartner = await Partner.findById(partner._id)
  return updatedPartner;
}

export async function deletePartner(id) {
  databaseConnection();
  const deletePartner = await Partner.findByIdAndDelete(id);
  const deletedPartner = { ...deletePartner._doc, status: "deleted" }
  return deletedPartner
}