
import { PencilIcon } from "@/public/icons.js"
import { Button, Collapse, Divider, Modal, Input, Text, Tooltip, Dropdown } from "@nextui-org/react"
import { updateContact } from "@/src/backend/utils/contact.js"
import { useState } from "react"

export default function EditContactButton({contactData, getContactsList}) {

  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState(contactData)

  function editFormData(e, index, type){
    const newFormData = formData
    newFormData.email[index] = {...newFormData.email[index], [type] : e }

    setFormData(newFormData)
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
          <Text>{contactData.name}</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Name</Text>
          <Input aria-label="input contact name" color="secondary" bordered initialValue={formData.name} />
          <Text>E-mail</Text>
          {formData.email.map((item, index) => (
            <>
              <div className="flex justify-between gap-2">
                <Input aria-label="input contact email" fullWidth color="secondary" bordered initialValue={item.value} />
                <Dropdown>
                  <Dropdown.Button size="md" css={{minWidth:"130px"}} color="secondary" bordered>
                    {formData.email.length > 0 ? formData.email[index].label : "Outro"}
                  </Dropdown.Button>
                  <Dropdown.Menu onAction={(e) => {editFormData(e, index, "label")}}>
                    <Dropdown.Item key="Trabalho">Trabalho</Dropdown.Item>
                    <Dropdown.Item key="Residencial">Residencial</Dropdown.Item>
                    <Dropdown.Item key="Outro">Outro</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          ))}
          <div>
          <Button flat color="secondary" size="xs" auto onPress={() => {console.log(formData)}}>+ Adicionar e-mail</Button>
          </div>
          <Text>Telefone</Text>
          {formData.phone.map((item, index) => (
            <>
              <div className="flex justify-between gap-2">
                <Input aria-label="input contact phone" fullWidth color="secondary" bordered initialValue={item.value} />
                <Dropdown>
                  <Dropdown.Button size="md" css={{minWidth:"130px"}} color="secondary" bordered>
                    {formData.phone.length > 0 ? formData.phone[index].label : "Outro"}
                  </Dropdown.Button>
                  <Dropdown.Menu onAction={(e) => {formData.phone[index].label = e}}>
                    <Dropdown.Item key="Trabalho">Trabalho</Dropdown.Item>
                    <Dropdown.Item key="Residencial">Residencial</Dropdown.Item>
                    <Dropdown.Item key="Outro">Outro</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <Dropdown>
                  <Dropdown.Button size="md" css={{minWidth:"130px"}} color="secondary" bordered>
                    {formData.phone.length > 0 ? (formData.phone[index].primary === true ? "Principal" : "") : ""}
                  </Dropdown.Button>
                  <Dropdown.Menu onAction={(e) => setFormData({...formData, phone: [{...formData.phone[index], primary: e}]})}>
                    <Dropdown.Item key={true}>Principal</Dropdown.Item>
                    <Dropdown.Item key={false}></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </>
          ))}
          <div>
          <Button flat color="secondary" size="xs" aut onPress={() => {console.log(formData)}}>+ Adicionar telefone</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button>Cancelar</Button>
          <Button>Atualizar contato</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}