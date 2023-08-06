import { ArrowUturnLeftIcon, XMarkIcon } from "@/public/icons.js"
import { Button, Tooltip, Modal, Text, Popover, Input, Avatar, User } from "@nextui-org/react"
import { useState } from "react"
import { createComment } from "@/src/backend/utils/comment.js"

export default function AddAnswerButton({comment, groupId, getComments, userData}) {

  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    group: groupId,
    parent: comment._id,
    created_by: userData.id
  })

  function handleFormEdit(e){
    setFormData({...formData, description: e.target.value}) // Atualiza o texto que está do input da resposta.
  }

  async function handleFormSubmit(body) {
    const answerCreate = await createComment(body) // Cria um novo comentário filho para o comentário pai >> RESPOSTA.
    getComments(groupId) // atualiza no componente principal de comentários a lista de comentários.
  }



  return(
  <Tooltip>
      <Popover isBordered placement="left-end" isOpen={isVisible} onClose={() => setIsVisible(false)}>
        <Popover.Trigger>
          <Button light auto color="secondary" iconRight={<ArrowUturnLeftIcon width="18px" />}onPress={() => setIsVisible(true)}/>
        </Popover.Trigger>
        <Popover.Content>
        <div className="flex flex-col pb-2 pt-4">
          <div className="flex justify-between pr-2">
            <User bordered color="secondary" src={comment.created_by.avatar || ""} name={comment.created_by.email} />
            <Button light color="error" auto icon={<XMarkIcon width="18px" />} onPress={() => setIsVisible(false)}/>
          </div>
          <div className="flex flex-col px-4 pt-4 pb-2 gap-4 max-w-md">
        <p className="text-ellipsis overflow-hidden">{comment.description}</p>
          <Input aria-label="comment input answer" type="text"
            labelLeft={<Avatar bordered src={userData.avatar || ""} text={userData.email} />}
            contentRight={
              <Button light color="secondary" auto icon={
                <ArrowUturnLeftIcon width="18px" />}
                onPress={() => handleFormSubmit(formData)}
            />}
            onChange={(e) => handleFormEdit(e)}
            />
            
          </div>
        </div>
        </Popover.Content>
      </Popover>
  </Tooltip>
  )
}