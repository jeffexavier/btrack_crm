import { TrashIcon, FaceSmileIcon, PlusIcon, PencilSquareIcon, DocumentPlusIcon, MinusCircleIcon } from "@/public/icons.js"
import { Button, Dropdown, Input, Modal, Radio, Textarea, Tooltip } from "@nextui-org/react"
import { useState } from "react"
import { updateGroup } from "@/src/backend/utils/group.js"
import { formToJSON } from "axios"

export default function ChurnButton({groupData}) {
  const [visible, setVisible] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [textButton, setTextButton] = useState("Registrar churn")
  const [colorButton, setColorButton] = useState("secondary")
  const [cancelFactor, setCancelFactor] = useState('')
  const [formData, setFormData] = useState({
    dt_cancel: '',
    cancel_tag: '',
    cancel_factor: cancelFactor,
    cancel_description: '',
    status: 'Inativo'
  })


  function handleFormEdit(e, name) {
      setFormData({
        ...formData,
        [name]: e.target.value
      })
  }  

  async function formSubmit(id, body) {
    setDisabledButton(true)
    setTextButton("Registrando churn...")
    const resUpdateGroup = await updateGroup(groupData._id, formData)
    setTimeout(() => {
      setDisabledButton(false)
      setColorButton(resUpdateGroup.ok === true ? "success" : "error")
      setTextButton(resUpdateGroup.ok === true ? "Churn registrado com sucesso!" : "Erro ao registrar o churn, tente novamente!")
      setTimeout(() => {
        setColorButton("secondary")
        setTextButton("Registrar churn")
      }, 2000);
    }, 2000);
    console.log(resUpdateGroup)    
    console.log(formData)
  }

  return (
    <>
    <Tooltip content={"Registro de churn"} rounded color="error">
    <button onClick={() => setVisible(true)}>
    <MinusCircleIcon color={groupData.status === "Ativo" ? "red" : "grey"} height={20}/>
    </button>
    </Tooltip>
    <Modal
    closeButton
      open={visible}
      onClose={() => setVisible(false)}
    >
    <Modal.Header css={{display:"flex", justifyContent:"start"}}>Registro de solicitação de churn.</Modal.Header>
      <Modal.Body>
        <Input type="date" label="Data da solicitação" required={true} onChange={(e) => handleFormEdit(e, "dt_cancel")}></Input>
        <Input type="text" label="Motivo" required={true} onChange={(e) => handleFormEdit(e, "cancel_tag")}></Input>
        <Radio.Group label="Fator" defaultValue="Incontrolável" orientation="horizontal">
          <Radio value="Incontrolável" color="warning" onFocus={(e) => handleFormEdit(e, "cancel_factor")}>Incontrolável</Radio>
          <Radio value="Controlável" color="error" onFocus={(e) => handleFormEdit(e, "cancel_factor")}>Controlável</Radio>
        </Radio.Group>
        <Input type="text" label="Fator" required={true} onChange={(e) => handleFormEdit(e, "cancel_factor")}></Input>
        <Textarea type="text" label="Descrição" required={true} onChange={(e) => handleFormEdit(e, "cancel_description")}></Textarea>
        <Button disabled={disabledButton} color={colorButton} onPress={() => formSubmit()}>{textButton}</Button>
      </Modal.Body>
      <Modal.Footer>{groupData.name_contract}</Modal.Footer>
    </Modal>
    </>
  )
}