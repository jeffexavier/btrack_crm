export async function updateGroup(id, body) {
  const groupUpdate = await fetch(`/api/group?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  })
  const updatedGroup = groupUpdate
  return(updatedGroup)
}