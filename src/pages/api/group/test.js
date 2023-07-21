export default async function testPost(req, res){
    if(req.method === "POST") {
        const request = await fetch('https://webhook.site/65b0e232-a4f6-45db-8e08-8bd913453abe', {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(req.body)
          })
    }
}