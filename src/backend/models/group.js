import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  id_legacy: {type: String, unique: true},
  name_contract: {type: String},
  name: {type: String},
  contract_cnpj: {type: Number, required: true, unique: true},
  status: {type: String, default: "Ativo"},
  cs: {type: String, default: "default@btrack.com.br"},
  csm: {type: String, default: "default@btrack.com.br"},
  dt_register: {type: Date, default: Date.now},
  dt_insert: {type: Date, default: Date.now},
  dt_update: {type: Date},
  segment: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  address: {type: String},
  address_number: {type: String},
  stage: {type: String, default: "Onboarding"},
  dt_stage: {type: Date},
  size: {type: String},
  plan: {type: String, default: "Trial"},
  dt_cancel: {type: Date},
  cancel_tag: {type: String},
  cancel_factor: {type: String},
  cancel_description: {type: String}
})

export default mongoose.models.Group || mongoose.model("Group", GroupSchema)