
import { Textarea, Button, Tooltip, Text } from "@nextui-org/react";
import { ChatBubbleBottomCenterTextIcon } from "@/public/icons.js";
import { useState } from "react";
import { createComment } from "@/src/backend/utils/comment.js";

export default function AreaCreateComment({groupId, userId}) {

  const [helperText, setHelperText] = useState("")

  const [formData, setFormData] = useState({
    group: groupId,
    created_by: userId,
    description: ''
  })

  async function commentCreate(body) {
    if(formData.description.length === 0) {
      setHelperText("Você precisa inserir ao menos um caractere!")
    } else {
      const createdComment = await createComment(body)
      console.log(createdComment)
      console.log(formData)
      // console.log(userId)
    }
  }

  function handleFormEdit(e){
    if(formData.description.length >= 0) {
      setHelperText('')
    }
    setFormData({...formData, description: e.target.value})
  }  

  return (
    <div className="flex flex-col w-full py-4 bg-[#fcfcfc] rounded-xl border-[1px] border-[#d9d9d9]">
    <Textarea
    minRows={1}
    maxRows={10}
      bordered
      borderWeight="0"
      color="secondary"
      onChange={(e) => {
        handleFormEdit(e);
      }}
      placeholder="Insira seu comentário..."
      aria-label="textarea"
    />
    <div className="flex justify-between px-4">
    <div className="flex flex-col justify-end">
    <Text color="error" size={12}>{helperText}</Text>
    </div>
    <Tooltip placement="top" content="Comentar.">
      <Button flat auto color="secondary" onPress={() => {commentCreate(formData)}} iconRight={<ChatBubbleBottomCenterTextIcon width="18px" />}></Button>
    </Tooltip>
    </div>
  </div>
  )
}

export function getServerSideProps({context}) {

}