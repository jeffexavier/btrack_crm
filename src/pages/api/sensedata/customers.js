
import axios from "axios"
import { verifyToken, readToken } from '@/src/backend/utils/token'
import { transformCustomers } from "@/src/backend/services/sensedata/customers.js";

export default async function handler(req, res, context) {
  const {limit, page} = req.query
  const {authorization} = req.cookies

  if (req.method === "GET") {
    try {
      verifyToken(authorization)
      await axios.get(process.env.SENSEDATA_API + "customers/?limit=1000",{
        params: {
          limit: limit,
          page: page
        },
        headers: {
          Authorization: `Bearer `+ process.env.SENSEDATA_TOKEN
        }
      })
      .then(response => {
          const customers = response.data;
          const newCustomers = transformCustomers(customers.customers, customers.per_page, customers.current_page, customers.next_page)
          res.status(200).json(newCustomers);
        })
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
  else if (req.method === "POST") {    
    res.status(200).json("recebido");
  }
}