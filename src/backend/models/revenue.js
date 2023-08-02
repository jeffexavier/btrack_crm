import mongoose from "mongoose";

const RevenueSchema = mongoose.Schema({
  group: {type: 'ObjectId', ref: "Group", required: true},
  id_group: {type: String, required: true},
  id_legacy: {type: String},
  description: {type: String},
  link_contract: {type: String},
  model: {type: String, default: "MRR"},
  type: {type: String, default: "Entrada", required: true},
  dt_start: {type: Date, default: Date.now},
  dt_end: {type: Date},
  monthly_payment: {type: Number, default: 0},
  status: {type: String, default: "Ativo"},
  plan: {type: String, default: "Trial"},
  license_qty: {type: Number, default: 1},
  register_reason: {type: String},
  register_factor:{type: String},
  register_description:{type: String}  
})

export default mongoose.models.Revenue || mongoose.model('Revenue', RevenueSchema);