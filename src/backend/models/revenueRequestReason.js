import mongoose from "mongoose";

const RevenueRequestReasonSchema = new mongoose.Schema({
  value: {type: String, required: true, unique: true}
})

export default mongoose.models.RevenueRequestReason || mongoose.model('RevenueRequestReason', RevenueRequestReasonSchema)