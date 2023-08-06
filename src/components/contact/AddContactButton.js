
import { Tooltip, Button, Modal, Text, Divider, Input, Radio, Dropdown } from "@nextui-org/react"
import { PlusIcon, UserPlusIcon, TrashIcon, XCircleIcon, PencilIcon } from "@/public/icons.js"
import { useState } from "react"
import { createContact } from "@/src/backend/utils/contact.js"

export default function AddContactButton({groupId, getContactsList}) {

  const bodyFormat = {
    groups: groupId,
    name: "",
    email: [],
    phone: [],
    primary: []
  }

  const [isVisible, setIsVisible] = useState(false)
  const [attComponent, setAttComponent] = useState(true)

  const [inputMessage, setInputMessage] = useState('Adicionar contato');
  const [colorMessage, setColorMessage] = useState('secondary')

  const [formData, setFormData] = useState(bodyFormat)

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

  async function handleFormSubmit(body) {
    console.log(body)
    const contactCreate = await createContact(body);
    console.log(contactCreate)

    setInputMessage('Contato Adicionado!')
    setColorMessage('success')
    setTimeout(() => {
      setInputMessage('Adicionar contato')
      setColorMessage('secondary')
      setFormData(bodyFormat)
      setIsVisible(false)
    }, 2000);
    getContactsList(groupId)
  }

  return (
    <>      
      <Tooltip content="Adicionar contato">
        <Button flat auto size="xs" color="secondary" icon={<PlusIcon width="18px" />} onPress={() => setIsVisible(true)}>Adicionar</Button>
      </Tooltip>
      <Modal
      closeButton
      onClose={() => {setIsVisible(false)}}
      open={isVisible}
      >
        <Modal.Header>
          <Text>Adicionar contato</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Name</Text>
          <Input aria-label="input contact name" color="secondary" bordered initialValue="" onChange={(e) => {editFormData(e, 0, 'name')}}/>
          <Text>E-mail</Text>
          {formData.email.map((item, index) => (
              <div className="flex justify-between gap-2">
                <Input aria-label="input contact email" fullWidth color="secondary" bordered initialValue={''} onChange={(e) => {editFormData(e.target.value, index, 'email', "value")}} />
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
            onPress={() => handleFormSubmit(formData)}
          >
            {inputMessage}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal
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
      </Modal> */}
    </>


  )
}
