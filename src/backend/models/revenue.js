import mongoose from "mongoose";

const RevenueSchema = mongoose.Schema({
  group: {type: 'ObjectId', ref: "Group", required: true},
  id_legacy: {type: String},
  type: {type: String, default: "Entrada", required: true},
  dt_request: {type: Date, default: Date.now},
  value: {type: Number, default: 0},
  license_qty: {type: Number, default: 0},
  request_reason: {type: 'ObjectId', ref: 'RevenueRequestReason'},
  request_factor:{type: String},
  request_description:{type: String}  
})

export default mongoose.models.Revenue || mongoose.model('Revenue', RevenueSchema);