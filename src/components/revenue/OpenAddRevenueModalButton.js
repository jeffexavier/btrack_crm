
import { PlusIcon } from "@/public/icons.js"
import { Button, Tooltip } from "@nextui-org/react"
import RevenueModal from "./AddRevenueModal.js"
import { useState } from "react"

export default function OpenAddRevenueModalButton({getRevenues}) {

  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
       <Tooltip color="secondary" content="Novo registro" >
        <Button flat auto color="secondary" size="xs" icon={<PlusIcon width="18px"/>} onPress={() => setIsVisible(true)}/>
        </Tooltip>
        <RevenueModal getRevenues={getRevenues} setIsVisible={setIsVisible} isVisible={isVisible}/>

    </>
  )
}