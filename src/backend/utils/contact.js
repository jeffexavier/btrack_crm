export async function createContact(body) {
  const contactCreate = await fetch('/api/contact', {
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

  const createdContact = contactCreate
  return createdContact
}

export async function updateContact(id, body) {
  const contactUpdate = await fetch(`/api/contact?id=${id}`, {
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
  const updatedContact = contactUpdate
  return updatedContact
}


export async function deleteContact(id, textValidator) {
  if(textValidator === "EXCLUIR") {
    const contactDelete = await fetch(`/api/contact?id=${id}`, {
      method: "DELETE"
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })    
    const deletedContact = contactDelete
    return deletedContact
  } else {
    return "Palavra incorreta!"
  }
}