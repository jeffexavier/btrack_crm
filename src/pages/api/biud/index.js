export default async function biud(req, res){
  if(req.method === 'GET'){
    const {cnpj} = req.query
    const formData = new FormData();
    formData.append('cnpj', cnpj.toString())
    console.log(formData)
    
    const newToken = await fetch('https://services.biud.com.br/api/biud-connect/register', {
      method: 'POST',
      body: formData
    }).then((response) => {
      return response.json()
    })
    
    console.log(newToken)

    console.log(cnpj.toString())
    res.status(200).json(newToken)
  }
}