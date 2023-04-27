// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as dotenv from 'dotenv'
dotenv.config()

import axios from "axios"

const bodyNota =  {
  customers_notes: [
    {
      id_legacy: "N1234598754asdfasdf",
      customer: {
        id: 37134
      },
      description: "teste do jeff agora foi? será? E FOOOOI, só passar como objeto se colocar json no header",
      created_on: "2023-04-26T23:24:00"
    }
  ]
}

const bodyNotaJSON = JSON.stringify(bodyNota)

export default async function handler(req, res) {
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
        console.log(response.data)
        res.status(202).json(response.data)
      })
    .catch(error => {
      console.log(req.body)
      console.log(error)
      res.status(500).json(error)
    })
  }
}