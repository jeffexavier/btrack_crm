import mongoose from "mongoose";

const ContractSchema = mongoose.Schema({
  group: {type: 'ObjectId', ref: "Group"},
  id_group: {type: String, required: true},
  id_legacy: {type:String, unique: true},
  description: {type: String},
  link_contract: {type: String},
  model: {type: String, default: "MRR"},
  type: {type: String, default: "Licenças"},
  dt_start: {type: Date, default: Date.now},
  dt_end: {type: Date},
  monthly_payment: {type: Number, default: 0},
  status: {type: String, default: "Ativo"},
  plan: {type: String},
  license_qty: {type: Number, default: 1},
  
})