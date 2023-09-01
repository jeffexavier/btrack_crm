import { createCustomers } from "@/src/backend/services/biud/customer.js"

export default async function customer(req, res){

  const body = req.body

  if(req.method === "POST") {
    const createCustomerBiud = await createCustomers(body)
    res.status(200).json(createCustomerBiud)
  }
}