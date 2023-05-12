// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"
import { verifyToken, readToken } from '@/src/backend/utils/token'

export default async function handler(req, res, context) {
  
  const {authorization} = req.cookies

  if (req.method === "GET") {
    try {
      verifyToken(authorization)
      await axios.get(process.env.SENSEDATA_API + "customers/?limit=1000",{
        headers: {
          Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
        }
      })
      .then(response => {
          const customers = response.data;
          res.status(200).json(customers);
        })
    } catch (error) {
      res.status(400).json(error.message)
    }
  } else if (req.method === "POST") {    
    res.status(200).json("recebido");
  }


}