export default async function(req, res){
  if(req.method === 'get'){
    res.status(200).json('teste get')
  }
}