import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  partner: {type: "ObjectId", red: "Partner"},
  group: {type: "ObjectId", ref: "Group"},
  created_by: {type: "ObjectId", ref: "User"},
  description: {type: String, required: true},
  dt_register: {type: Date, default: Date.now},
  dt_update: {type: Date},
  edited: {type: Boolean, default: false},
  parent: {type: "ObjectId", ref: 'Comment'},
  children: [{type: "ObjectId", ref: 'Comment'}]
})

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);