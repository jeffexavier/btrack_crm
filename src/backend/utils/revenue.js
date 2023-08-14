export async function createRevenue(body) {
  const revenueCreate = await fetch('/api/revenue', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  }).catch((error) => {
    return error
  })

  const createdRevenue = revenueCreate
  return createdRevenue
}

export async function updateRevenue(id, body) {
  const revenueUpdate = await fetch(`/api/revenue?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  }).catch((error) => {
    return error.message
  })
  const updatedRevenue = revenueUpdate
  return updatedRevenue
}


export async function deleteRevenue(id) {
    const revenueDelete = await fetch(`/api/revenue?id=${id}`, {
      method: "DELETE"
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })    
    const deletedRevenue = revenueDelete
    return deletedRevenue
}