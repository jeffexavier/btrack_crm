export default async function biud(req, res){
  if(req.method === 'GET'){
    res.status(200).json('teste get')
    const newToken = await fetch('')
  }
}