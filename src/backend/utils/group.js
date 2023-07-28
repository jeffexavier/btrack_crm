export async function updateGroup(id, body) {
  const groupUpdate = await fetch(`/api/group?id=${id}`, {
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
  const updatedGroup = groupUpdate
  return updatedGroup
}

export async function createGroup(body) {
  const groupCreate = await fetch('/api/group', {
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

  const createdGroup = groupCreate
  return createdGroup
}

export async function deleteGroup(id, textValidator) {
  if(textValidator === "EXCLUIR") {
    const groupDelete = await fetch(`/api/group?id=${id}`, {
      method: "DELETE"
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })    
    const deletedGroup = groupDelete
    return deletedGroup
  } else {
    return "Palavra incorreta!"
  }
}