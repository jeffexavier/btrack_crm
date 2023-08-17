import mongoose from "mongoose";

import Partner from "./partner.js";
import Group from "./group.js"
import Contact from "./contact.js";

const NpsSchema = new mongoose.Schema({
  id_legacy: {type: String},
  partner: {type: 'ObjectId', ref: Partner},
  group: {type: 'ObjectId', ref: Group, required: true},
  contact: {type: 'ObjectId', ref: Contact},
  ref_date: {type: Date, default: Date.now},
  survey_date: {type: Date, default: Date.now},
  score: {type: Number, required: true},
  nps_status: {type: String},
  stage: {type: String},
  category: {type: String},
  comment: {type: String},
  tags: {type: String},
  dt_register: {type: Date, default: Date.now},
  dt_update: {type: Date}
})

export default mongoose.models.Nps || mongoose.model('Nps', NpsSchema)