// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as dotenv from 'dotenv'
dotenv.config()

import axios from "axios"

export default async function handler(req, res) {
  console.log('Teste env: '+ process.env.SENSEDATA_TOKEN)
  await axios.get("https://api.sensedata.io/v2/customers_notes",{
    headers: {
      Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
    }
  })
  .then(response => {
      const customerNote = response.data
      res.status(200).json(customerNote);
    })
}