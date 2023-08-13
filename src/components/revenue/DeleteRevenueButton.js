import { TrashIcon, XMarkIcon } from "@/public/icons.js"
import { deleteRevenue } from "@/src/backend/utils/revenue.js"
import { Tooltip, Button, Popover } from "@nextui-org/react"
import { useEffect, useState } from "react"

export function DeleteRevenueButton({revenueData, getRevenues}) {
  const [verify, setVerify] = useState(false)
  const [buttonColor, setButtonColor] = useState(revenueData.request_status === "won" ? "success" : "error")

  function openPopover(boolean){
    if(verify === false) {
      setVerify(!verify)
      setButtonColor('error')
    }
    console.log(boolean)
  }

  async function revenueDelete(id) {
    const deletedRevenue = await deleteRevenue(id)
    console.log(deletedRevenue)
    cancelDelete()
    getRevenues()
  }

  function cancelDelete() {
    setVerify(false)
    setButtonColor(revenueData.request_status === "won" ? "success" : "error")
  }

  useEffect(() => {
    setButtonColor(revenueData.request_status === "won" ? "success" : "error")
  }, [])

  return(
    <Tooltip color={revenueData.request_status === "won" ? "success" : "error"} content="Excluir">
    <Popover borderWeight={0} placement="right" isOpen={verify} onClose={() => cancelDelete()}>
      <Popover.Trigger>
      
        <Button light auto color={revenueData.request_status === "won" ? "success" : "error"} iconRight={<TrashIcon width="18px" />} onPress={() => openPopover(true)}/>
      
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex justify-end">
          <Button light auto color="error" onPress={() => {cancelDelete()}} iconRight={<XMarkIcon width="20px" />} />
            <Button flat auto color="error" iconRight={<TrashIcon width="18px" />} onPress={() => revenueDelete(revenueData._id)}/>
        </div>
      </Popover.Content>
    </Popover>
    </Tooltip>
  )
}