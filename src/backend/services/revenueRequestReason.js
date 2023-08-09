
import databaseConnection from "../utils/database";

import RevenueRequestReason from "../models/revenueRequestReason";


import { createToken } from "@/src/backend/utils/token";

export async function createRevenueRequestReason(body) {
  await databaseConnection();
    const newRevenueRequestReason = body
    const createNewRevenueRequestReason = await RevenueRequestReason.create(newRevenueRequestReason);

    if(body.parent) {
      const parent = await RevenueRequestReason.findById(body.parent)
      if(parent.children){
        parent.children.push(createNewRevenueRequestReason._id)
        await parent.save()
      }
    }

    return createNewRevenueRequestReason     
}

export async function listRevenueRequestReasons(id, value) {
  await databaseConnection();

  const query = {};

  if(id) {
    query._id = id
  } else if(value) {
    query.value = value
  }

  const listRevenueRequestReasons = await RevenueRequestReason.find(query)
  return listRevenueRequestReasons;
}

export async function updateRevenueRequestReason(id, value, body) {
  try {
    await databaseConnection();
    if(id) {
      const revenueRequestReason = await RevenueRequestReason.findByIdAndUpdate(id, body);
      const updatedRevenueRequestReason = await RevenueRequestReason.findById(revenueRequestReason._id)
      return updatedRevenueRequestReason;
    } else if(value) {
      const revenueRequestReason = await RevenueRequestReason.findOneAndUpdate({value}, {value: body.value});
      const updatedRevenueRequestReason = await RevenueRequestReason.findById(revenueRequestReason._id)
      return updatedRevenueRequestReason;
    }
  } catch (error) {
    return error
  }
}

export async function deleteRevenueRequestReason(id) {
  try {
    await databaseConnection();
    const deleteRevenueRequestReason = await RevenueRequestReason.findByIdAndDelete(id);
    const deletedRevenueRequestReason = { ...deleteRevenueRequestReason._id, status: "deleted" }  
    return deletedRevenueRequestReason    
  } catch (error) {
    return error
  }
}