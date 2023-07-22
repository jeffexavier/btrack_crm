// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Profile from "../models/profile";

import { createToken } from "@/src/backend/utils/token";

export async function createProfile(body) {
  await databaseConnection();
  const newProfile = body
  const createNewProfile = await Profile.create(newProfile);
  return createNewProfile
}

export async function listProfiles(id) {
  databaseConnection();
  if(id){
    const profile = await Profile.findById(id);
    return profile;
}
  const listProfiles = await Profile.find();
  return listProfiles;
}

export async function updateProfile(id, body) {
  databaseConnection();
  const profile = await Profile.findByIdAndUpdate(id, body);
  const updatedProfile = await Profile.findById(profile._id)
  return updatedProfile;
}

export async function deleteProfile(id) {
  databaseConnection();
  const deleteProfile = await Profile.findByIdAndDelete(id);
  const deletedProfile = {
    _id: deleteProfile._id,
    name: deleteProfile.name,
    role: deleteProfile.role,
    status: "deleted"
  }

  return deletedProfile
}