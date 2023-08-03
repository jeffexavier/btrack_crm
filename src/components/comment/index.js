'use-client'

import { Collapse, Input, User, Button, Textarea, Divider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUturnLeftIcon, ChatBubbleBottomCenterTextIcon, PencilIcon, TrashIcon } from "@/public/icons.js";
import CommentInput from "./CommentInput.js";
import AreaCreateComment from "./AreaCreateComment.js";


export function AreaComment({userId, groupId}) {

  const [formData, setFormData] = useState({});
  const [comments, setComments] = useState([])

  const groupData = { valor: "jeff" };

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

    const listedComments = listComments.value.reverse()
    setComments(listedComments)

    // console.log(listedComments)
  }

  useEffect(() => {
    getComments(groupId)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <AreaCreateComment groupId={groupId} userId={userId} />
      {comments.map((comment, index) => (
        <div key={index} className="flex flex-col w-full gap-2 pt-4 bg-[#fff] rounded-xl border-[0px] border-[#d9d9d9]">
          <CommentInput comment={comment} commentType="comment"/>
            {comment.children.map((child, index) => (
              <div key={index} className="flex flex-col w-full gap-2 pl-4 bg-[#fff] rounded-xl border-[0px] border-[#d9d9d9]">
                <CommentInput comment={child} commentType="child"/>
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
