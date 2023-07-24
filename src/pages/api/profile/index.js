import { verifyToken } from "@/src/backend/utils/token";
import {
  createProfile,
  listProfiles,
  updateProfile,
  deleteProfile,
} from "@/src/backend/services/profile.js";

export default async function profile(req, res) {
  if (req.method === "POST") {
    try {
      const createdProfile = await createProfile(req.body);
      res.status(201).json(createdProfile);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const {id} = req.query
      const listedProfiles = await listProfiles(id);
      const responseListedProfiles = {
        value: listedProfiles,
        count: listedProfiles.length ? (listedProfiles.length) + 1 : (0 + 1) 
      };
      res.status(200).json(responseListedProfiles);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const updatedProfile = await updateProfile(id, req.body);
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedProfile = await deleteProfile(id);
      res.status(200).json(deletedProfile);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
