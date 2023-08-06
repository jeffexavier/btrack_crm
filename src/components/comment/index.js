'use-client'

import { Collapse, Input, User, Button, Textarea, Divider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUturnLeftIcon, ChatBubbleBottomCenterTextIcon, PencilIcon, TrashIcon } from "@/public/icons.js";
import CommentInput from "./CommentInput.js";
import AreaCreateComment from "./AreaCreateComment.js";


export function AreaComment({userId, groupId}) {

  const [formData, setFormData] = useState({});
  const [comments, setComments] = useState([])


  function handleFormEdit(e, name) {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  }

  async function getComments(id_group){
    const listComments = await fetch(`/api/comment/?id_group=${id_group}`).then((response) => {
      return response.json()
    })

    const listedComments = listComments.value.slice(0).reverse()
    setComments(listedComments)
    console.log(listedComments)

  }

  function setConsoleLog(groupId) {
    console.log(groupId)
  }

  useEffect(() => {
    getComments(groupId)
  }, [])

  return (
    <div className="flex flex-col gap-4">
        <AreaCreateComment userId={userId} groupId={groupId} getComments={getComments} />
      {comments.map((comment, index) => (
        <div key={comments.length - index} className="flex flex-col w-full gap-2 pt-4 bg-[#fff] rounded-xl border-[0px] border-[#d9d9d9]">
          <CommentInput comment={comment} commentType="comment" groupId={groupId} getComments={getComments}/>
            {comment.children.map((child, index) => (
              <div key={comment.children.length - index} className="flex flex-col w-full gap-2 pl-4 bg-[#fff] rounded-xl border-[0px] border-[#d9d9d9]">
                <CommentInput comment={child} commentType="child" groupId={groupId} getComments={getComments}/>
              </div>
              ))
            }
          <Divider />
          </div>      
        ))
        }
    </div>
  );
}
