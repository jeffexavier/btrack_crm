import { PencilSquareIcon } from "@/public/icons.js";
import { Button, Collapse, Input, Modal, Text, Textarea, Grid} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { updateGroup } from "@/src/backend/utils/group.js";
import formatDate from "@/src/backend/utils/formatDate.js";

export default function DetailGroupButton({groupId}) {

  const [isVisible, setIsVisible] = useState(false)
  const [groupData, setGroupData] = useState({})
  const [nameContract, setNameContract] = useState(groupData.name_contract)

  const [formData, setFormData] = useState({
    name_contract: groupData.name_contract,
    name: groupData.name,
    id_legacy: groupData.id_legacy,
    contract_cnpj: groupData.contract_cnpj,
    status: groupData.status,
    cs: groupData.cs,
    csm: groupData.csm,
    dt_register: formatDate(groupData.dt_register),
    dt_insert: formatDate(groupData.dt_insert),
    segment: groupData.segment,
    city: groupData.city,
    state: groupData.state,
    country: groupData.country,
    address: groupData.address,
    address_number: groupData.address_number,
    stage: groupData.stage,
    dt_stage: formatDate(groupData.dt_stage),
    size: groupData.size,
    plan: groupData.plan,
    dt_cancel: formatDate(groupData.dt_cancel),
    cancel_tag: groupData.cancel_tag,
    cancel_factor: groupData.cancel_factor,
    cancel_description: groupData.cancel_description
  })

  function handleFormEdit(e, name) {
    setFormData({
      ...formData,
      [name]: e.target.value
    })
  }

  async function getGroup(_id) {
    const getGroupData = await fetch(`/api/group?id=${_id}`).then(response => {
    return response.json()
    })
    const newGroupData = getGroupData
    console.log(newGroupData.value)
    setFormData(newGroupData.value)
    setIsVisible(true)
  }

  async function handleFormSubmit(id, body) {
  //   const submitData = await fetch(`/api/group?id=${groupId}`, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'PUT',
  //     body: JSON.stringify(formData)
  //   }).then((response) => {
  //     return response.json()
  //   })
  //   const submitedData = submitData;
  //   console.log(submitedData)  
  const updatedGroup = await updateGroup(id, body)
  }
    
  // function formatDate(date){
  //   const newDate = new Date(date);
  //   let day = newDate.getDate();
  //   let month = newDate.getMonth() + 1;
  //   const year = newDate.getFullYear();

  //   if(day < 10) {
  //     day = '0' + day
  //   }

  //   if(month < 10) {
  //     month = '0' + month
  //   }

  //   return `${year}-${month}-${day}`
  // }

  useEffect(() => {
  }, [])

  return (
    <>
    <Button
      auto
      color="warning"
      icon={
        <PencilSquareIcon
        width={18}
        />
      }

      onPress={() => getGroup(groupId)}
    >
    Editar
    </Button>
    <Modal
    closeButton
    open={isVisible}
    onClose={() => setIsVisible(false)}
    >
      <Modal.Header css={{justifyContent:"flex-start"}}>
        <Text h4>{groupData.name_contract}</Text>
      </Modal.Header>
      <Modal.Body>
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'name_contract')}} label="Nome Fantasia" initialValue={formData.name_contract} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'name')}} label="Razão Social" initialValue={formData.name} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'id_legacy')}} label="ID Legado" initialValue={formData.id_legacy} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'contract_cnpj')}} label="CNPJ" initialValue={formData.contract_cnpj} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'status')}} label="Status" initialValue={formData.status} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cs')}} label="CS" initialValue={formData.cs} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'csm')}} label="CSM" initialValue={formData.csm} />
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_register')}} label="Data registro" initialValue={formatDate(formData.dt_register)} />
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_insert')}} label="Data inserção" initialValue={formatDate(formData.dt_insert)} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'segment')}} label="Segmento" initialValue={formData.segment} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'city')}} label="Cidade" initialValue={formData.city} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'state')}} label="Estado" initialValue={formData.state} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'country')}} label="País" initialValue={formData.country} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'address')}} label="Endereço" initialValue={formData.address} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'address_number')}} label="Número" initialValue={formData.address_number} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'stage')}} label="Fase" initialValue={formData.stage} />
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_stage')}} label="Data fase" initialValue={formatDate(formData.dt_stage)} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'size')}} label="Porte" initialValue={formData.size} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'plan')}} label="Plano" initialValue={formData.plan} />
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_cancel')}} label="Data cancelamento" initialValue={formatDate(formData.dt_cancel)} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cancel_tag')}} label="Motivo cancelamento" initialValue={formData.cancel_tag} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cancel_factor')}} label="Fator cancelamento" initialValue={formData.cancel_factor} />
        <Textarea bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cancel_description')}} label="Descrição cancelamento" initialValue={formData.cancel_description} />
      </Modal.Body>
      <Modal.Footer>
        <Button  auto flat onPress={() => setIsVisible(false)} color="error">Cancelar</Button>
        <Button auto type="submit" onPress={() => handleFormSubmit(groupId, formData)} color="secondary">Salvar</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}