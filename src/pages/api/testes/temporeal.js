export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function respEvent(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  res.write('data: Teste \n\n');
  res.end('done\n');
}