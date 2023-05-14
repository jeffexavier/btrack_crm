import axios from "axios"
import { verifyToken } from "@/src/backend/utils/token.js";

export default async function getUsersSenseData(req, res) {
  const { limit, page } = req.query
  try {
    // verifyToken(req.cookies.authorization)
    await axios.get(process.env.SENSEDATA_API + "tasks",{
      params: {
        limit: limit,
        page: page
      },
      headers: {
        Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
      }
    })
    .then(response => {
        const usersSenseData = response.data;
        res.status(200).json(usersSenseData);
      })
  } catch (error) {
    res.status(400).json(error.message)
  }

}