
import databaseConnection from "../utils/database";

import Revenue from "../models/revenue.js";
import RevenueRequestReason from "../models/revenueRequestReason.js";

export async function listRevenues(id, id_legacy, group) {
  await databaseConnection();

  const query = {};

  if(id) {
    query._id = id
  }

  if(id_legacy){
    query.id_legacy = id_legacy
  }

  if(group){
    query.group = group
  }

  const listRevenues = await Revenue.find(query).populate("group").populate('request_reason');
  return listRevenues;
}

export async function createRevenue(body) {
  await databaseConnection();
  
  const newBody = body
  
  const lastRevenue = await Revenue.findOne({group: body.group}).sort({dt_request: -1})

  if(body.request_type === "Migração") {
    newBody.last_plan = lastRevenue.plan
    newBody.plan = body.plan
  } else if(body.request_type === "Assinatura"){    
    newBody.plan = body.plan
  } else {
    newBody.last_plan = lastRevenue.last_plan
    newBody.plan = lastRevenue.plan
  }

  if(body.request_reason && body.request_reason._id) {
    const getRevenueRequestReason = await RevenueRequestReason.findById(body.request_reason._id)
    newBody.request_reason = getRevenueRequestReason._id
    
  } else if(body.request_reason && body.request_reason.value) {
    const getRevenueRequestReason = await RevenueRequestReason.findOne({value: body.request_reason.value})
    
    newBody.request_reason = getRevenueRequestReason._id
  }



  const createNewRevenue = await Revenue.create(newBody);
  const createdNewRevenue = await Revenue.findById(createNewRevenue._id).populate('group').populate('request_reason')
  return createdNewRevenue

}

export async function updateRevenue(id, id_legacy, body) {
  await databaseConnection();
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
  await databaseConnection();
  const deleteRevenue = await Revenue.findByIdAndDelete(id);
  const deletedRevenue = { ...deleteRevenue._doc, status: "deleted"}
  return deletedRevenue
}