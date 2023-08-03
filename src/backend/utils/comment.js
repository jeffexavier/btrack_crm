export async function updateComment(id, body) {
  const commentUpdate = await fetch(`/api/comment?id=${id}`, {
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
  const updatedComment = commentUpdate
  return updatedComment
}

export async function createComment(body) {
  const commentCreate = await fetch('/api/comment', {
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

  const createdComment = commentCreate
  return createdComment
}

export async function deleteComment(id) {
    const commentDelete = await fetch(`/api/comment?id=${id}`, {
      method: "DELETE"
    }).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })    
    const deletedComment = commentDelete
    return deletedComment
}