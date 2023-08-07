import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  id_legacy: {type: String},
  groups: [{type: 'ObjectId', ref: 'Group', required: true}],
  partners: [{type: 'ObjectId', ref: 'Group'}],
  name: {type: String, required: true},
  occupation: {type: String},
  phone: [{
    value: {type: String, required: true},
    primary: {type: Boolean, default: false},
    label: {type: String, default: 'Outro'}
  }],
  email: [{
    value: {type: String, required: true},
    primary: {type: Boolean, default: false},
    label: {type: String, default: 'Outro'}
  }],
  dt_register: {type: Date, default: Date.now},
  dt_update: {type: Date}
})

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)