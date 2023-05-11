import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
  link: {type: String, required: true,
  qrcode: {type: String, required: true},
  date: {type: Date, default: Date.now}
  }
})

export default moongose.models.QrCode || mongoose.model("QrCode", qrCodeSchema)