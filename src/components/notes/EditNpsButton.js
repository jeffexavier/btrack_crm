import { useState } from "react"
import NpsModal from "./NpsModal.js"
import { Button } from "@nextui-org/react"

import { PencilIcon } from "@/public/icons.js"

export default function EditNpsButton({npsData, getNpsList }) {

  const [isVisible, setIsVisible] = useState(false)

  function openModal() {
    setIsVisible(true)
  }

  return (
    <>
      <Button light auto color="secondary" icon={<PencilIcon width="18px"/>} onPress={() => openModal()} />
      <NpsModal npsData={npsData} isVisible={isVisible} setIsVisible={setIsVisible} getNpsList={getNpsList} />
    </>
  )
}