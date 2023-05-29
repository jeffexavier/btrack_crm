import axios from "axios"
import { transformNps } from "@/src/backend/services/sensedata/nps.js";
import { verifyToken } from "@/src/backend/utils/token.js";

export default async function getUsersSenseData(req, res) {
  const { limit, page, updatedAtStart, updatedAtEnd } = req.query
  // console.log(updatedAtStart, updatedAtEnd)
  try {
    // verifyToken(req.cookies.authorization)
    await axios.get(process.env.SENSEDATA_API + "nps",{
      params: {
        limit: limit,
        page: page,
        'updated_at:start': updatedAtStart,
        'updated_at:end': updatedAtEnd
      },
      headers: {
        Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
      }
    })
    .then(response => {
        const usersSenseData = response.data;
        // console.log(usersSenseData)
        const transformedNps = transformNps(usersSenseData.nps, usersSenseData.per_page, usersSenseData.current_page, usersSenseData.next_page)
        res.status(200).json(transformedNps);
      })
  } catch (error) {
    res.status(400).json(error.message)
  }

}