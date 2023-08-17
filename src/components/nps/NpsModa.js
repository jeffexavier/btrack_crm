
import { PlusIcon, XCircleIcon, ChevronDownIcon } from "@/public/icons.js"
import { Modal, Text, Button, Input, Textarea, Dropdown } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function NpsModal({npsData, isVisible, setIsVisible}) {

  const [formData, setFormData] = useState(npsData ? npsData : {})
  const [listedGroups, setListedGroups] = useState([])
  const [listedContacts, setListedContacts] = useState([])

  function onChangeSelectGroup(index) {
    setFormData({
      ...formData,
      group: {...listedGroups[index]}
    })

    getContacts(listedGroups[index]._id)
  }

  async function getGroups() {
    const groupList = await fetch('/api/group').then((response) => {
      return response.json();
    }).catch((error) => {
      return error
    })
    setListedGroups(groupList.value)
  }

  async function getContacts(id_group) {
    const contactList = await fetch(`/api/contact?id_group=${id_group}`).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })
    console.log(contactList.value)
    setListedContacts(contactList.value)
  }



  useEffect(() => {
    getGroups()
  }, [])

  return (
    <Modal
      closeButton
      open={isVisible}
      onClose={() => setIsVisible(false)}
    >
      <Modal.Header>
        <Text>Adicionar NPS</Text>
      </Modal.Header>
      <Modal.Body>
      <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Empresa</Text>
      <Dropdown isBordered isDisabled={npsData ? true : false}>
        <Dropdown.Trigger>
          <Button color="secondary" bordered icon={<ChevronDownIcon width="18px" />}>{formData.group ? formData.group.name_contract : 'Escolha uma empresa'}</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu onAction={(e) => onChangeSelectGroup(e)}>
          {listedGroups.map((item, index) => (
            <Dropdown.Item color="secondary" key={index}>{item.name_contract || ''}</Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Contato</Text>
      <Dropdown isBordered isDisabled={npsData ? true : false}>
        <Dropdown.Trigger>
          <Button color="secondary" bordered icon={<ChevronDownIcon width="18px" />}>{formData.contact ? formData.contact.name : 'Selecione um contato'}</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu onAction={(e) => console.log(e)}>
          {listedContacts.map((item, index) => (
            <Dropdown.Item color="secondary" key={index}>{item.name || ''}</Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
        <Input bordered color="secondary" type="text" label="Contato" />
        <Input bordered color="secondary" type="date" label="Data da pesquisa" />
        <Input bordered color="secondary" type="date" label="Data da resposta" />
        <div className="flex pl-1 gap-2">
          <Text size="$sm" color="secondary">Nota</Text>
          <Text size="$sm">{`(${'Detrator'})`}</Text>
        </div>
        <div className="flex justify-between m-0 p-0">
          <Button color="error" size="xs" auto>0</Button>
          <Button color="error" size="xs" auto>1</Button>
          <Button color="error" size="xs" auto>2</Button>
          <Button color="error" size="xs" auto>3</Button>
          <Button color="error" size="xs" auto>4</Button>
          <Button color="error" size="xs" auto>5</Button>
          <Button color="error" size="xs" auto>6</Button>
          <Button color="warning" size="xs" auto>7</Button>
          <Button color="warning" size="xs" auto>8</Button>
          <Button color="success" size="xs" auto>9</Button>
          <Button color="success" size="xs" auto>10</Button>
        </div>
        <Textarea bordered color="secondary" label="Comentário" type="text"></Textarea>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2">
          <Button light color="error" auto icon={<XCircleIcon width="18px"/>} onPress={() => setIsVisible(false)}>Cancelar</Button>
          <Button flat color="secondary" auto icon={<PlusIcon width="18px"/>}>Adicionar NPS</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}