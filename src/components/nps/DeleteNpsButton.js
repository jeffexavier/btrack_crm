import { TrashIcon, XMarkIcon } from "@/public/icons.js"
import { deleteNps } from "@/src/backend/utils/nps.js"
import { Tooltip, Button, Popover } from "@nextui-org/react"
import { useEffect, useState } from "react"

export function DeleteNpsButton({npsId, getNpsList}) {
  const [verify, setVerify] = useState(false)
  const [buttonColor, setButtonColor] = useState("error")

  function openPopover(boolean){
    if(verify === false) {
      setVerify(!verify)
      setButtonColor('error')
    }
    console.log(boolean)
  }

  async function revenueDelete(id) {
    const deletedNps = await deleteNps(id)
    console.log(deletedNps)
    cancelDelete()
    getNpsList()
  }

  function cancelDelete() {
    setVerify(false)
    setButtonColor("secondary")
  }

  useEffect(() => {
    setButtonColor("secondary")
  }, [])

  return(
    <Tooltip color="error" content="Excluir">
    <Popover borderWeight={0} placement="right" isOpen={verify} onClose={() => cancelDelete()}>
      <Popover.Trigger>
      
        <Button light auto color={buttonColor} iconRight={<TrashIcon width="18px" />} onPress={() => openPopover(true)}/>
      
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex justify-end">
          <Button light auto color="error" onPress={() => {cancelDelete()}} iconRight={<XMarkIcon width="20px" />} />
            <Button flat auto color="error" iconRight={<TrashIcon width="18px" />} onPress={() => revenueDelete(npsId)}/>
        </div>
      </Popover.Content>
    </Popover>
    </Tooltip>
  )
}