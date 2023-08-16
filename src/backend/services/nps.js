
import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Nps from "../models/nps";
import Partner from "../models/partner";

import { createToken } from "@/src/backend/utils/token";

export async function createNps(body) {
  await databaseConnection();
  
  const newNps = body

  if(body.score < 0 || body.score > 10) {
    return "Erro: Valor válido entre 0 e 10."
  } else if(body.score <= 6) {
   newNps.nps_status = "Detractor"
  } else if(body.score <= 8) {
    newNps.nps_status = "Neutro"
  } else if(body.score >= 9 ) {
    newNps.nps_status = "Promotor"
  }

    const createNewNps = await Nps.create(newNps);

    return createNewNps;     
}

export async function listNps(id, id_legacy) {
  databaseConnection();
  if(id){
    const nps = await Nps.findById(id).populate('group').populate('contact', "name");
    return nps;
  } else if(id_legacy){
    const nps = await Nps.findOne({id_legacy}).populate('group').populate('contact', "name");
    return nps;
  }

  const listNpss = await Nps.find().populate('group').populate('contact', "name");
  return listNpss;
}

export async function updateNps(id, id_legacy, body) {
  databaseConnection();
  if(id) {
    const nps = await Nps.findByIdAndUpdate(id, {...body, dt_update: new Date()});
    const updatedNps = await Nps.findById(nps._id)
    return updatedNps;
  }
  const nps = await Nps.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date()});
  const updatedNps = await Nps.findById(nps._id)
  return updatedNps;
}

export async function deleteNps(id) {
  try {
    databaseConnection();
    const deleteNps = await Nps.findByIdAndDelete(id);
    const deletedNps = { ...deleteNps, status: "deleted" }  
    return deletedNps    
  } catch (error) {
    return error
  }
}