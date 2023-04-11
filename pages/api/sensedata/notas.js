// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

export default async function handler(req, res) {
  await axios.get("https://api.sensedata.io/v2/customers_notes",{
    headers: {
      Authorization: "token"
    }
  })
  .then(response => {
      const customerNote = response.data
      res.status(200).json(customerNote);
    })
}