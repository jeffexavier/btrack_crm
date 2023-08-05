
import { Tooltip, Button, Modal, Text, Divider, Input, Radio } from "@nextui-org/react"
import { PlusIcon, UserPlusIcon } from "@/public/icons.js"
import { useState } from "react"
import { createContact } from "@/src/backend/utils/contact.js"

export default function AddContactButton({groupId, getContactsList}) {

  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState({})

  function handleFormEdit(e, name) {
    setFormData({
      ...formData, [name] : e.target.value
    })
  }

  function handleFormRadioEdit(e, name) {
    setFormData({
      ...formData, [name] : e
    })
  }


  async function handleFormSubmit(groupId, body) {
    const newBody = {
      groups: groupId,
      name: body.name,
      email: {
        value: body.emailValue,
        label: body.emailLabel
      },
      phone: {
        value: body.phoneValue,
        label: body.phoneLabel
      }

    }
    
    const contactUpdate = await createContact(newBody)
    getContactsList(groupId) // Atualiza a lista de contatos no componente pai.

    setIsVisible(false)

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
        <Input aria-label="input" bordered animated color="secondary" type="text" placeholder="Lohane Vêkanandre Sthephany Smith Bueno de HA HA HA de Raio Laser bala de Icekiss" onChange={(e) => {handleFormEdit(e, 'name')}} label="Nome" value={formData.name} />
        <Input aria-label="input"bordered animated color="secondary" type="email" placeholder="val@disnei.com" onChange={(e) => {handleFormEdit(e, 'phoneValue')}} label="E-mail" value={formData.phoneValue} />
        <Radio.Group aria-label="input" orientation="horizontal" onChange={(e) => {handleFormRadioEdit(e, 'emailLabel')}}>
          <Radio value="trabalho">Trabalho</Radio>
          <Radio value="comercial">Comercial</Radio>
          <Radio value="pessoal">Pessoal</Radio>
        </Radio.Group>
        <Input aria-label="input" bordered animated color="secondary" type="tel" placeholder="61999999999" onChange={(e) => {handleFormEdit(e, 'emailValue')}} label="Telefone" value={formData.emailValue} />
        <Radio.Group aria-label="input" orientation="horizontal"onChange={(e) => {handleFormRadioEdit(e, 'phoneLabel')}}>
          <Radio value="trabalho">Trabalho</Radio>
          <Radio value="comercial">Comercial</Radio>
          <Radio value="pessoal">Pessoal</Radio>
        </Radio.Group>
        <Divider />
        </Modal.Body>
        <Modal.Footer>
        <Button flat auto onPress={() => handleFormSubmit(groupId, formData)} color="secondary" icon={<UserPlusIcon width="18px"/>}>Adicionar contato</Button>
        </Modal.Footer>
      </Modal>
    </>


  )
}