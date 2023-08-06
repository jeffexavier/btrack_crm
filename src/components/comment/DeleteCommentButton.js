
import { deleteComment } from "@/src/backend/utils/comment.js"
import { Button, Modal, Popover, Text, Tooltip } from "@nextui-org/react"
import { useState } from "react"
import { TrashIcon, XMarkIcon } from "@/public/icons.js"

export default function DeleteCommentButton({commentId}){

  const [verify, setVerify] = useState(false)
  const [buttonColor, setButtonColor] = useState('secondary')

  function openPopover(boolean){
    if(verify === false) {
      setVerify(!verify)
      setButtonColor('error')
    }
    console.log(boolean)
  }

  async function commentDelete(id) {
    const deletedComment = await deleteComment(id)
    console.log(deletedComment)
    cancelDelete()
  }



  function cancelDelete() {
    setVerify(false)
    setButtonColor('secondary')
  }

  return (
    <>
    {/* {verify === true ? <Button light auto color="error" onPress={() => {cancelDelete()}} iconRight={<XMarkIcon width="20px" />}></Button> : ""} */}
    <Popover borderWeight={0} placement="top" isOpen={verify} onClose={() => cancelDelete()}>
      <Popover.Trigger>
        <Button light auto color={buttonColor} iconRight={<TrashIcon width="18px" />} onPress={() => openPopover(true)}/>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex justify-end">
          <Button light auto color="error" onPress={() => {cancelDelete()}} iconRight={<XMarkIcon width="20px" />} />
            <Button flat auto color="error" iconRight={<TrashIcon width="18px" />} onPress={() => commentDelete(commentId)}/>
        </div>
      </Popover.Content>
    </Popover>
    </>
  )
}