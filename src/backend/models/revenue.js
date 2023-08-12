import mongoose from "mongoose";
import Group from "./group.js"

const RevenueSchema = new mongoose.Schema({
  group: {type: 'ObjectId', ref: Group, required: true},
  id_legacy: {type: String},
  request_status: {type: String, default: "won", required: true},
  request_type: {type: String, default: "Assinatura", required: true},
  plan: {type: String},
  dt_request: {type: Date, default: Date.now},
  request_value: {type: Number, default: 0},
  license_qty: {type: Number, default: 0},
  request_reason: {type: 'ObjectId', ref: 'RevenueRequestReason'},
  request_factor:{type: String},
  request_description:{type: String}  
})

export default mongoose.models.Revenue || mongoose.model('Revenue', RevenueSchema);