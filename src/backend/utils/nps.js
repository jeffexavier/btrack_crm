export async function updateNps(id, body) {
  const npsUpdate = await fetch(`/api/nps?id=${id}`, {
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
  const updatedNps = npsUpdate
  return updatedNps
}

export async function createNps(body) {
  const npsCreate = await fetch('/api/nps', {
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

  const createdNps = npsCreate
  return createdNps
}

export async function deleteNps(id) {
    const npsDelete = await fetch(`/api/nps?id=${id}`, {
      method: "DELETE"
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })    
    const deletedNps = npsDelete
    return deletedNps
}