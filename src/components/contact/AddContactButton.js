
import { Tooltip, Button, Modal, Text, Divider, Input, Radio, Dropdown } from "@nextui-org/react"
import { PlusIcon, UserPlusIcon, TrashIcon, XCircleIcon, PencilIcon, ChevronDownIcon } from "@/public/icons.js"
import { useEffect, useState } from "react"
import { createContact } from "@/src/backend/utils/contact.js"
import { listGroup } from "@/src/backend/utils/group.js"

export default function AddContactButton({groupId, getContactsList}) {

  
  const bodyFormat = {
    groups: groupId || "",
    name: "",
    email: [],
    phone: [],
    primary: []
  }
  

  
  const [isVisible, setIsVisible] = useState(false)
  const [attComponent, setAttComponent] = useState(true)
  
  const [listedGroups, setListedGroups] = useState([])
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

  function onChangeSelectGroup(index) {
    setFormData({
      ...formData,
      groups: {...listedGroups[index]}
    })
  }

  async function getGroups() {
    const groupList = await fetch('/api/group').then((response) => {
      return response.json();
    }).catch((error) => {
      return error
    })
    setListedGroups(groupList.value)
  }

  useEffect(() => {
    if(!groupId) {
      getGroups()
      console.log("teste não tenho groupID")
    }
  }, [])

  return (
    <>      
      <Tooltip content="Adicionar contato">
        {groupId ? 
        <Button flat auto size="xs" color="secondary" icon={<PlusIcon width="18px" />} onPress={() => setIsVisible(true)}>Adicionar</Button>
        :
        <Button flat auto color="secondary" icon={<UserPlusIcon width="18px" />} onPress={() => setIsVisible(true)}>Adicionar contato</Button>
        }
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
        <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Empresa</Text>
          <Dropdown isBordered >
            <Dropdown.Trigger>
              <Button color="secondary"  bordered icon={<ChevronDownIcon width="18px" />}>{formData.groups ? formData.groups.name : 'Escolha uma empresa'}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onAction={(e) => onChangeSelectGroup(e)}>
              {listedGroups.map((item, index) => (
                <Dropdown.Item color="secondary" key={index}>{item.name || ''}</Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
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
    </>


  )
}
