import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  id_legacy: {type: String},
  name_contract: {type: String},
  name: {type: String},
  contract_cnpj: {type: String, required: true, unique: true},
  status: {type: String, default: "Ativo"},
  cs: {type:String},
  csm: {type: String},
  dt_register: {type: Date, default: Date.now},
  segment: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  address: {type: String},
  adress_number: {type: String},
  stage: {type: String, default: "Onboarding"},
  dt_stage: {type: Date, default: Date.now},
  plan: {type: String, default: "Trial"},
  dt_cancel: {type: Date},
  cancel_tag: {type: String},
  cancel_factor: {type: String},
  cancel_description: {type: String}
})

export default mongoose.models.Group || mongoose.model("Group", GroupSchema)