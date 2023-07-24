import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  role: {type: String, required: true}
})

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)