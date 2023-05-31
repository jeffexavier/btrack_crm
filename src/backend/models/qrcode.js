import mongoose from "mongoose";

const QrCodeSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  link: {type: String, required: true,
  qrcode: {type: String, required: true},
  date: {type: Date, default: Date.now}
  }
})

export default moongose.models.QrCode || mongoose.model("QrCode", QrCodeSchema)