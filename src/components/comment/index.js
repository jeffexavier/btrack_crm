'use-client'

import { Collapse, Input, User, Button, Textarea, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ArrowUturnLeftIcon, ChatBubbleBottomCenterTextIcon, PencilIcon, TrashIcon } from "@/public/icons.js";

export function AreaComment({groupId}) {
  console.log(groupId)
  // const [isEditable, setIsEditable] = useState(false)
  const [formData, setFormData] = useState({});
  const [comments, setComments] = useState([])

  function formatDateToLocaleString(date) {
    return new Date(date).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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

    console.log(listedComments)
  }

  

  useEffect(() => {
    getComments(groupId)
  }, [])

  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full py-4 bg-[#fcfcfc] rounded-xl border-[1px] border-[#d9d9d9]">
          <Textarea
          minRows={1}
          maxRows={10}
            bordered
            borderWeight="0"
            color="secondary"
            onChange={(e) => {
              handleFormEdit(e, "teste");
            }}
            placeholder="Insira seu comentário..."
            initialValue={groupData.valor}
            aria-label="textarea"
          />
          <div className="flex justify-end px-4">
          <Button flat auto color="secondary" onPress={() => {getComments(groupId)}} iconRight={<ChatBubbleBottomCenterTextIcon width="18px" />}></Button>
          </div>
        </div>

        {comments.map((comment, index) => (
        <div key={index} className="flex flex-col w-full gap-2 pt-4 bg-[#fff] rounded-xl border-[0px] border-[#d9d9d9]">
        <User src="https://github.com/jeffexavier.png" name={comment.created_by.email} />
        <div className="flex justify-between gap-4 pr-4 ml-4 h-fit rounded-md shadow-md mb-6">
          <Textarea key={index} minRows={1} helperText={comment.dt_update ? `Editado em ${formatDateToLocaleString(comment.dt_update)}` : ""}
            maxRows={5}  bordered borderWeight="0" fullWidth aria-label="textarea" initialValue={comment.description}/>
          <Button key={index} light auto color="secondary" onPress={() => {getComments(groupId)}} iconRight={<ArrowUturnLeftIcon width="18px" />}></Button>
          <Button key={index} light auto color="secondary" onPress={() => {getComments(groupId)}} iconRight={<TrashIcon width="18px" />}></Button>
          <Button key={index} light auto color="secondary" onPress={() => {getComments(groupId)}} iconRight={<PencilIcon width="18px" />}></Button>
        </div>
        {comment.children.map((child, index) => (
          <div key={index} className="flex flex-col w-full gap-0 pb-6 pl-4 bg-[#fff] rounded-xl border-[0px] border-[#d9d9d9]">
            <User src="https://github.com/jeffexavier.png" name={child.created_by.email} />
            <div className="flex justify-between gap-4 pr-4 ml-4 h-fit rounded-md shadow-md">
            <Textarea key={index} minRows={1} helperText={child.dt_update ? `Editado em ${formatDateToLocaleString(child.dt_update)}` : ""}
            maxRows={5} readOnly bordered borderWeight="0" fullWidth aria-label="textarea" initialValue={child.description}/>
              <Button key={index} light auto color="secondary" onPress={() => {getComments(groupId)}} iconRight={<TrashIcon width="18px" />}></Button>
              <Button key={index} light auto color="secondary" onPress={() => {getComments(groupId)}} iconRight={<PencilIcon width="18px" />}></Button>
            </div>
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
