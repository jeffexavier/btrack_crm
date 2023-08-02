import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
  id_legacy: {type: String},
  name: {type: String, required: true},
  opportunities_qty: {type: Number, default: 0},
  status: {type: String, default: "Ativo"},
  groups: [{type: 'ObjectId', ref: "Group"}],
  dt_register: {type: Date, default: Date.now},
  dt_insert: {type: Date, default: Date.now},
  dt_update: {type: Date}
})

export default mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);