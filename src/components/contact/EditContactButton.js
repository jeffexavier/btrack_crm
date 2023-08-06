'use-client'

import { PencilIcon, TrashIcon, XCircleIcon } from "@/public/icons.js"
import { Button, Collapse, Divider, Modal, Input, Text, Tooltip, Dropdown } from "@nextui-org/react"
import { updateContact } from "@/src/backend/utils/contact.js"
import { useState, useEffect } from "react"


export default function EditContactButton({contactData, getContactsList, groupId}) {

  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState(contactData)
  const [attComponent, setAttComponent] = useState(true)

  const [inputMessage, setInputMessage] = useState('Atualizar contato');
  const [colorMessage, setColorMessage] = useState('secondary')

  function editFormData(e, index, item, type){
    const newFormData = formData
    
    if(item === 'email'){
      newFormData.email[index] = {...newFormData.email[index], [type] : e }      
    }
    
    if(item === 'phone'){
      newFormData.phone[index] = {...newFormData.phone[index], [type] : e }
    }

    if(item === 'name'){
      newFormData.name = e.target.value
    }

    setAttComponent(!attComponent)
    
    setFormData(newFormData)
    // console.log(formData)
  }

  function addItemInput(item) {
    const newFormData = formData

    if(item === 'email') {
      newFormData.email.push({label: 'Outro'})
    }

    if(item === 'phone') {
      newFormData.phone.push({label: 'Outro'})
    }

    setFormData(formData)
    setAttComponent(!attComponent)
  }

  function removeItemInput(item, index) {
    if(item === 'email') {
      formData.email.splice(index, 1)
    }

    if(item === 'phone') {
      formData.phone.splice(index, 1)
    }
    setAttComponent(!attComponent)
  }

  async function handleFormSubmit(contactId, body) {
    const contactUpdate = await updateContact(contactId, body);
    console.log(contactUpdate)

    setInputMessage('Atualizado!')
    setColorMessage('success')
    setTimeout(() => {
      setInputMessage('Atualizar contato')
      setColorMessage('secondary')
    }, 2000);
    getContactsList(groupId)
  }



  return(
    <>
      <Tooltip content="Editar contato">
        <Button light auto color="secondary" icon={<PencilIcon width="18px" />} onPress={() => {setIsVisible(true)}}/>
      </Tooltip>
      <Modal
      closeButton
      onClose={() => {setIsVisible(false)}}
      open={isVisible}
      >
        <Modal.Header>
        <div className="flex justify-start">
          <Text>Editar contatos{formData.name}</Text>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Text>Name</Text>
          <Input aria-label="input contact name" color="secondary" bordered initialValue={formData.name} onChange={(e) => {editFormData(e, 0, 'name')}}/>
          <Text>E-mail</Text>
          {formData.email.map((item, index) => (
              <div className="flex justify-between gap-2">
                <Input aria-label="input contact email" fullWidth color="secondary" bordered initialValue={item.value} onChange={(e) => {editFormData(e.target.value, index, 'email', "value")}} />
                <Dropdown>
                  <Dropdown.Button size="md" css={{minWidth:"130px"}} color="secondary" bordered>
                    {item.label}
                  </Dropdown.Button>
                  <Dropdown.Menu onAction={(e) => {editFormData(e, index, 'email',"label")}}>
                    <Dropdown.Item key="Trabalho">Trabalho</Dropdown.Item>
                    <Dropdown.Item key="Residencial">Residencial</Dropdown.Item>
                    <Dropdown.Item key="Outro">Outro</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button light auto color="error" icon={<TrashIcon width="18px" />} onPress={() => {removeItemInput('email', index)}}></Button>
              </div>
          ))}
          <div>
          <Button flat color="secondary" size="xs" auto onPress={() => addItemInput('email')}>+ Adicionar e-mail</Button>
          </div>
          <Text>Telefone</Text>
          {formData.phone.map((item, index) => (
            <>
              <div className="flex justify-between gap-2">
                <Input aria-label="input contact phone" fullWidth color="secondary" bordered initialValue={item.value} onChange={(e) => {editFormData(e.target.value, index, 'phone', "value")}} />
                <Dropdown>
                  <Dropdown.Button size="md" css={{minWidth:"130px"}} color="secondary" bordered>
                    {item.label}
                  </Dropdown.Button>
                  <Dropdown.Menu onAction={(e) => {editFormData(e, index, 'phone', "label")}}>
                    <Dropdown.Item key="Trabalho">Trabalho</Dropdown.Item>
                    <Dropdown.Item key="Residencial">Residencial</Dropdown.Item>
                    <Dropdown.Item key="Outro">Outro</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button light auto color="error" icon={<TrashIcon width="18px" />} onPress={() => {removeItemInput('phone', index)}}></Button>
              </div>
            </>
          ))}
          <div>
          <Button flat color="secondary" size="xs" auto onPress={() => {addItemInput('phone')}}>+ Adicionar telefone</Button>
          </div>
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
            color={colorMessage}
            icon={<PencilIcon width="18px" />}
            onPress={() => handleFormSubmit(contactData._id, formData)}
          >
            {inputMessage}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}