
import { Tooltip, Button, Modal, Text, Divider, Input } from "@nextui-org/react"
import { PlusIcon, UserPlusIcon } from "@/public/icons.js"
import { useState } from "react"

export default function addContactButton({groupId}) {

  const [isVisible, setIsVisible] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  const [formData, setFormData] = useState({})

  function handleFormEdit(e, name) {
    setFormData({
      ...formData, [name] : e.target.value
    })
  }

  async function handleFormSubmit(groupId, body) {
    console.log(formData)
  }

  return (
    <>      
      <Tooltip content="Adicionar contato">
        <Button light auto color="secondary" icon={<PlusIcon width="18px" />} onPress={() => setIsVisible(true)}/>
      </Tooltip>
      <Modal
        closeButton
        onClose={() => {setIsVisible(false)}}
        open={isVisible}
      >
        <Modal.Header>
          <Text>Adicionar contato</Text>
        </Modal.Header>
        <Divider />
        <Modal.Body>
        <Input bordered animated color="secondary" type="text" placeholder="Lohane Vêkanandre Sthephany Smith Bueno de HA HA HA de Raio Laser bala de Icekiss" onChange={(e) => {handleFormEdit(e, 'name')}} label="Nome" value={formData.name} />
        <Input bordered animated color="secondary" type="email" placeholder="val@disnei.com" onChange={(e) => {handleFormEdit(e, 'phone')}} label="E-mail" value={formData.phone} />
        <Input bordered animated color="secondary" type="tel" placeholder="61999999999" onChange={(e) => {handleFormEdit(e, 'email')}} label="Telefone" value={formData.email} />
        <Divider />
        </Modal.Body>
        <Modal.Footer>
        <Button flat auto onPress={() => handleFormSubmit(groupId, formData)} color="secondary" icon={<UserPlusIcon width="18px"/>}>Adicionar contato</Button>
        </Modal.Footer>
      </Modal>
    </>


  )
}