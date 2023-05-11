// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as dotenv from 'dotenv'
dotenv.config()

import axios from "axios"
import { verifyToken } from '@/src/backend/services/user.js'

export default async function handler(req, res) {
  const {authorization} = req.cookies
  try {
    verifyToken(authorization);
    if(req.method === 'GET' ) {
      await axios.get(process.env.SENSEDATA_API + "customers_notes/?limit=1000",{
        headers: {
          Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
        }
      })
      .then(response => {
          const customerNote = response.data;
          res.status(200).json(customerNote);
        })
    } else if(req.method === 'POST') {
      await axios.post(process.env.SENSEDATA_API + "customers_notes",
        req.body, {
          headers: {
            Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
          }
        }
      )
      .then(response => {
          res.status(202).json(response.data)
        })
  }} catch (error) {
    res.status(500).json(error.message)
  }
}
