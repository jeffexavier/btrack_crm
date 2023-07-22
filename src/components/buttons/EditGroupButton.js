import { PencilSquareIcon } from "@/public/icons.js";
import { Button, Collapse, Input, Modal, Text, Textarea, Grid} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DetailGroupButton({groupData}) {

  const [formData, setFormData] = useState({
    name_contract: groupData.name_contract,
    name: groupData.name,
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
    const newGroupData = await fetch(`/api/group?id=${_id}`).then(response => {
    return response.json()
    })
    const groupDatatest = newGroupData
    console.log(groupDatatest.value)
    
    // setIsVisible(true)
  }

  // async function handleFormSubmit() {
  //   const submitData = await fetch(`/api/group?id=${groupData
  //   ._id}`, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'PUT',
  //     body: JSON.stringify(formData)
  //   }).then(res => {
  //     const response = res
  //     console.log(response)
  //   })
  // }

  function formatDate(date){
    const newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    if(day < 10) {
      day = '0' + day
    }

    if(month < 10) {
      month = '0' + month
    }

    return `${year}-${month}-${day}`
  }

  const [isVisible, setIsVisible] = useState(false)
  const [nameContract, setNameContract] = useState(groupData.name_contract)


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

      onPress={() => getGroup(groupData._id)}
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
        <Input bordered animated color="secondary" type="text" label="Razão Social" initialValue={formData.name} />
        <Input bordered animated color="secondary" type="text" label="CNPJ" initialValue={formData.contract_cnpj} />
        <Input bordered animated color="secondary" type="text" label="Status" initialValue={formData.status} />
        <Input bordered animated color="secondary" type="text" label="CS" initialValue={formData.cs} />
        <Input bordered animated color="secondary" type="text" label="CSM" initialValue={formData.csm} />
        <Input bordered animated color="secondary" type="date" label="Data registro" initialValue={formatDate(formData.dt_register)} />
        <Input bordered animated color="secondary" type="date" label="Data inserção" initialValue={formatDate(formData.dt_insert)} />
        <Input bordered animated color="secondary" type="text" label="Segmento" initialValue={formData.segment} />
        <Input bordered animated color="secondary" type="text" label="Cidade" initialValue={formData.city} />
        <Input bordered animated color="secondary" type="text" label="Estado" initialValue={formData.state} />
        <Input bordered animated color="secondary" type="text" label="País" initialValue={formData.country} />
        <Input bordered animated color="secondary" type="text" label="Endereço" initialValue={formData.address} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'address_number')}} label="Número" initialValue={formData.address_number} />
        <Input bordered animated color="secondary" type="text" label="Fase" initialValue={formData.stage} />
        <Input bordered animated color="secondary" type="date" label="Data fase" initialValue={formatDate(formData.dt_stage)} />
        <Input bordered animated color="secondary" type="text" label="Porte" initialValue={formData.size} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'plan')}} label="Plano" initialValue={formData.plan} />
        <Input bordered animated color="secondary" type="date" label="Data cancelamento" initialValue={formatDate(formData.dt_cancel)} />
        <Input bordered animated color="secondary" type="text" label="Motivo cancelamento" initialValue={formData.cancel_tag} />
        <Input bordered animated color="secondary" type="text" label="Fator cancelamento" initialValue={formData.cancel_factor} />
        <Textarea bordered animated color="secondary" type="text" label="Descrição cancelamento" initialValue={formData.cancel_description} />
      </Modal.Body>
      <Modal.Footer>
        <Button  auto flat onPress={() => setIsVisible(false)} color="error">Cancelar</Button>
        <Button auto type="submit" onPress={() => handleFormSubmit()} color="secondary">Salvar</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}