
import { deleteContact } from "@/src/backend/utils/contact.js"
import { useState } from "react"
import { Popover, Button, Tooltip } from "@nextui-org/react"
import { TrashIcon, XMarkIcon } from "@/public/icons.js"

export default function DeleteContactButton({contactId, getContactsList, groupId}) {

  const [verify, setVerify] = useState(false)
  const [buttonColor, setButtonColor] = useState('secondary')

  function openPopover(boolean){
    if(verify === false) {
      setVerify(!verify)
      setButtonColor('error')
    }
    console.log(boolean)
  }

  async function contactDelete(id) {
    const deletedContact = await deleteContact(id)
    console.log(deletedContact)
    cancelDelete()

    getContactsList(groupId)

  }

  function cancelDelete() {
    setVerify(false)
    setButtonColor('secondary')
  }

  return(
    <Tooltip content="Excluir contato">
    <Popover borderWeight={0} placement="right" isOpen={verify} onClose={() => cancelDelete()}>
      <Popover.Trigger>
      
        <Button light auto color={buttonColor} iconRight={<TrashIcon width="18px" />} onPress={() => openPopover(true)}/>
      
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex justify-end">
          <Button light auto color="error" onPress={() => {cancelDelete()}} iconRight={<XMarkIcon width="20px" />} />
            <Button flat auto color="error" iconRight={<TrashIcon width="18px" />} onPress={() => contactDelete(contactId)}/>
        </div>
      </Popover.Content>
    </Popover>
    </Tooltip>
  )
}