export async function updateGroup(id, body) {
  const groupUpdate = await fetch(`/api/group?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then((res) => {
    console.log(res.status)
    console.log(res.ok)
    return(res)
  })
  return(groupUpdate)
}