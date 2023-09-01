
import { PlusIcon, XCircleIcon, ChevronDownIcon } from "@/public/icons.js"
import { Modal, Text, Button, Input, Textarea, Dropdown } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { createNps, updateNps } from "@/src/backend/utils/nps.js"
import formatDate from "@/src/backend/utils/formatDate.js"

export default function NpsModal({npsData, getNpsList, isVisible, setIsVisible}) {

  const [formData, setFormData] = useState(npsData ? npsData : {})
  const [listedGroups, setListedGroups] = useState([])
  const [listedContacts, setListedContacts] = useState([])

  function onHandleFormEdit(value, name) {
    setFormData({...formData, [name]: value})
  }

  function onChangeSelectGroup(index) {
    setFormData({
      ...formData,
      group: {...listedGroups[index]}
    })

    getContacts(listedGroups[index]._id)
  }

  function onChangeSelectContact(index) {
    setFormData({
      ...formData,
      contact: {...listedContacts[index]}
    })
    console.log(index)
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

  async function onHandleCreateNps(body) {
    const npsCreate = await createNps(body)
    console.log(npsCreate)
    getNpsList()
    
    if(npsData) {
      setIsVisible(false)
    } else {
      setFormData({group: formData.group, survey_date: formData.survey_date})
    }
  }

  async function onHandleUpdateNps(id, body) {
    // const npsUpdate = await updateNps(id, body)
    // console.log(npsUpdate)
    // getNpsList()
    // setIsVisible(false)
    setFormData({...formData})

    console.log(formData)
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
          <Button color="secondary" disabled={npsData ? true : false} bordered icon={<ChevronDownIcon width="18px" />}>{formData.group ? formData.group.name : 'Escolha uma empresa'}</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu onAction={(e) => onChangeSelectGroup(e)}>
          {listedGroups.map((item, index) => (
            <Dropdown.Item color="secondary" key={index}>{item.name || ''}</Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Contato</Text>
      <Dropdown isBordered isDisabled={listedContacts.length === 0 || formData.contact ? true : false}>
        <Dropdown.Trigger>
          <Button color="secondary" disabled={listedContacts.length === 0 || formData.contact ? true : false} bordered icon={<ChevronDownIcon width="18px" />}>{formData.contact ? formData.contact.name || "" : 'Selecione um contato'}</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu onAction={(e) => onChangeSelectContact(e)}>
          <Dropdown.Item color="secondary" key={null}>{'-'}</Dropdown.Item>
          {listedContacts.map((item, index) => (
            <Dropdown.Item color="secondary" key={index}>{item.name || ''}</Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
        <Input bordered color="secondary" type="date" label="Data da pesquisa" onChange={(e) => onHandleFormEdit(e.target.value,"survey_date")} initialValuealue={formatDate(formData.survey_date || "")}/>
        <Input bordered color="secondary" type="date" label="Data da resposta" onChange={(e) => onHandleFormEdit(e.target.value,"ref_date")} initialValue={formatDate(formData.ref_date || "")} />
        <div className="flex pl-1">
          <Text size="$sm" color="secondary">Nota</Text>
        </div>
        <div className="flex justify-between m-0 p-0">
          <Button color="error" flat={formData.score === 0 ? false : true}  size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>0</Button>
          <Button color="error" flat={formData.score === 1 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>1</Button>
          <Button color="error" flat={formData.score === 2 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>2</Button>
          <Button color="error" flat={formData.score === 3 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>3</Button>
          <Button color="error" flat={formData.score === 4 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>4</Button>
          <Button color="error" flat={formData.score === 5 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>5</Button>
          <Button color="error" flat={formData.score === 6 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>6</Button>
          <Button color="warning" flat={formData.score === 7 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>7</Button>
          <Button color="warning" flat={formData.score === 8 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>8</Button>
          <Button color="success" flat={formData.score === 9 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>9</Button>
          <Button color="success" flat={formData.score === 10 ? false : true} size="xs" auto onPress={(e) => onHandleFormEdit(Number(e.target.innerText),"score")}>10</Button>
        </div>
        <Textarea bordered color="secondary" label="Comentário" type="text" onChange={(e) => onHandleFormEdit(e.target.value,"comment")} value={formData.comment || ""}></Textarea>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-2">
          <Button light color="error" auto icon={<XCircleIcon width="18px"/>} onPress={() => setIsVisible(false)}>Cancelar</Button>
          {npsData ? 
          <Button flat color="secondary" disabled={formData.group && formData.score >= 0 ? false : true} auto icon={<PlusIcon width="18px"/>} onPress={() => onHandleUpdateNps(npsData._id, formData)}>Editar NPS</Button>
          :
          <Button flat color="secondary" disabled={formData.group && formData.score >= 0 ? false : true} auto icon={<PlusIcon width="18px"/>} onPress={() => onHandleCreateNps(formData)}>Adicionar NPS</Button>
          }
        </div>
      </Modal.Footer>
    </Modal>
  )
}