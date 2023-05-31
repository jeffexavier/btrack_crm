export default function Contracts(req, res) {
  const reqBody = req.body
  if(req.method === "POST") {
    try {
      if(reqBody.event.name === "auto_close") {
        console.log(reqBody.event.name)
        res.status(200).json(req.body)      
      } else {
        res.status(400).json("Evento não suportado.")
      }
    } catch (error) {
      res.status(400).json("erro")
    }
  }
  
}