export async function createCustomers(body) {
  if(body.length > 0){
    // console.log(body)
    const createdCustomersBiud = body.map( async (item, index) => {
      const createCustomerBiud = await fetch(process.env.BIUD_API + '/api/biud-connect/customer', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).catch((error) => {
        return error
      })
      return {...item, response: createCustomerBiud}
    })
    return await Promise.all(createdCustomersBiud).then((response) => response)
    // return typeof(body)
  } else {
    const createCustomerBiud = await fetch(process.env.BIUD_API + '/api/biud-connect/customer', {
      method: 'POST',
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })
    return createCustomerBiud
  }
}