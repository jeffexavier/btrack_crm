import { useState } from "react"
import NpsModal from "./NpsModa.js"
import { Button } from "@nextui-org/react"

import { PlusIcon } from "@/public/icons.js"

export default function AddNpsButton() {

  const [isVisible, setIsVisible] = useState(false)

  function openModal() {
    setIsVisible(true)
  }

  return (
    <>
      <Button flat auto color="secondary" icon={<PlusIcon width="18px"/>} onPress={() => openModal()}>Adicionar NPS</Button>
      <NpsModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  )
}