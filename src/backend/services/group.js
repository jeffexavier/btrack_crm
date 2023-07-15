// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Group from "../models/group";

import { createToken } from "@/src/backend/utils/token";

export async function createGroup(body) {
  await databaseConnection();
  const newGroup = {
    id_legacy: body.id_legacy,
    name_contract: body.name_contract,
    name: body.name,
    contract_cnpj: body.contract_cnpj,
    status: body.status,
    cs: body.cs,
    csm: body.csm,
    dt_register: body.dt_register,
    dt_insert: body.insert,
    segment: body.segment,
    city: body.city,
    state: body.state,
    country: body.country,
    address: body.address,
    adress_number: body.adress_number,
    stage: body.stage,
    dt_stage: body.dt_stage,
    size: body.size,
    plan: body.plan,
    dt_cancel: body.dt_cancel,
    cancel_tag: body.cancel_tag,
    cancel_factor: body.cancel_factor,
    cancel_description: body.cancel_description
  };

  const createNewGroup = await Group.create(newGroup);
  return createNewGroup
}

export async function listGroups() {
  databaseConnection();
  const listGroups = await Group.find();
  return listGroups;
}

export async function deleteGroup(id) {
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
}