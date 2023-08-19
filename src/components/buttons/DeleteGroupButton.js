import { TrashIcon, XCircleIcon } from "@/public/icons.js";
import { Button, Modal, Text, Input } from "@nextui-org/react";
import { deleteGroup } from "@/src/backend/utils/group.js";
import { useEffect, useState } from "react";


export default function DeleteGroupButton({groupId, groupName, getGroups}) {

  const [isVisible, setIsVisible] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [formData, setFormData] = useState('')
  const [inputMessage, setInputMessage] = useState('')
  const [colorMessage, setColorMessage] = useState("error")

  async function groupDelete(id, textValidator) {

    if(isDisabled === false) {
      
      setIsDisabled(true)

      const deletedGroup = await deleteGroup(id, textValidator)
      console.log(deletedGroup)
      if(deletedGroup.status === "deleted"){
        setInputMessage('Grupo deletado com sucesso!')
        setColorMessage('success')
        getGroups()
        setTimeout(() => {
          setInputMessage()
          setIsVisible(false)
        }, 1000);
      }
    else {
      setInputMessage("Verifique a palavra inserida.")
      setColorMessage('error')
      setTimeout(() => {
        setInputMessage()
      }, 2000);
    }

    setTimeout(() => {
      setIsDisabled(false)
    }, 2000);
    setFormData('')
    }

}

function handleFormSubmit(e){
  setFormData(e.target.value)
}

  return (
    <>
    <Button light auto color="secondary" icon={<TrashIcon width="20px"/>} onPress={() => setIsVisible(true)}/>
    <Modal
      open={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton
    >
      <Modal.Header>
        <Text>Para deletar o grupo <b>{groupName}</b><br/>digite a palavra <b>"EXCLUIR"</b> no campo abaixo.</Text>
      </Modal.Header>
      <Modal.Body>
     <Input bordered color="secondary" type="text" placeholder="Digite aqui..." onChange={(e) => handleFormSubmit(e)}></Input>
     <Text color={colorMessage} size={14}>{inputMessage}</Text>
      </Modal.Body>
      <Modal.Footer>
      <Button
            flat
            auto
            color="error"
            icon={<XCircleIcon width="18px" />}
            onPress={() => setIsVisible(false)}
          >
            Cancelar
          </Button>
          <Button
            auto
            color="error"
            icon={<TrashIcon width="18px" />}
            onPress={() => groupDelete(groupId, formData)}
          >
            Deletar grupo
          </Button>
      </Modal.Footer>
    </Modal>
    
    </>
  )
}