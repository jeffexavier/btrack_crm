import { ArrowPathRoundedSquareIcon, PencilSquareIcon, XCircleIcon } from "@/public/icons.js";
import { Button, Collapse, Input, Modal, Text, Textarea, Grid, Divider} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { updateGroup } from "@/src/backend/utils/group.js";
import formatDate from "@/src/backend/utils/formatDate.js";

export default function DetailGroupButton({groupId, getGroups}) {

  const [isVisible, setIsVisible] = useState(false)
  const [messageButton, setMessageButton] = useState('Atualizar grupo')
  const [colorButton, setColorButton] = useState('secondary')
  const [isDisabled, setIsDisabled] = useState(false)
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
    dt_register: groupData.dt_register ? formatDate(groupData.dt_register) : "",
    dt_insert: groupData.dt_insert ? formatDate(groupData.dt_insert) : "",
    segment: groupData.segment,
    city: groupData.city,
    state: groupData.state,
    country: groupData.country,
    address: groupData.address,
    address_number: groupData.address_number,
    stage: groupData.stage,
    dt_stage: groupData.dt_stage ? formatDate(groupData.dt_stage) : "",
    size: groupData.size,
    plan: groupData.plan,
    dt_cancel: groupData.dt_cancel ? formatDate(groupData.dt_cancel) : "",
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
  
  async function handleFormSubmit(id, body) {

    if(isDisabled === false) {
      setIsDisabled(true)

      const updatedGroup = await updateGroup(id, body)
      setColorButton('success')
      setMessageButton('Grupo atualizado')
  
      setTimeout(() => {
        setColorButton('secondary')
        setMessageButton('Atualizar grupo')
        setIsDisabled(false)
      }, 2000);
  
      getGroups()
    }

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

  useEffect(() => {
  }, [])

  return (
    <>
    <Button flat auto color="secondary" icon={<PencilSquareIcon width={18} />} onPress={() => getGroup(groupId)}>
    Editar
    </Button>
    <Modal
    width="600px"
    closeButton
    open={isVisible}
    onClose={() => setIsVisible(false)}
    >
      <Modal.Header css={{justifyContent:"flex-start"}}>
        <Text h4>{groupData.name_contract}</Text>
      </Modal.Header>
      <Modal.Body>
      <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'name_contract')}} label="Nome Fantasia" initialValue={formData.name_contract} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'name')}} label="Razão Social" initialValue={formData.name} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'id_legacy')}} label="ID Legado" initialValue={formData.id_legacy} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'contract_cnpj')}} label="CNPJ" initialValue={formData.contract_cnpj} />
        </div>

        <Divider/>
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cs')}} label="CS" initialValue={formData.cs} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'csm')}} label="CSM" initialValue={formData.csm} />
        <div className="grid grid-cols-2 gap-4">
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_register')}} label="Data registro" initialValue={formData.dt_register} />
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_insert')}} label="Data inserção" initialValue={formData.dt_insert} />
        </div>
        <Divider/>
        <div className="grid grid-cols-2 gap-4">
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'city')}} label="Cidade" initialValue={formData.city} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'state')}} label="Estado" initialValue={formData.state} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'country')}} label="País" initialValue={formData.country} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'address')}} label="Endereço" initialValue={formData.address} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'address_number')}} label="Número" initialValue={formData.address_number} />
        </div>
        <Divider/>
        <div className="grid grid-cols-2 gap-4">
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'stage')}} label="Fase" initialValue={formData.stage} />
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_stage')}} label="Data fase" initialValue={formData.dt_stage} />
        </div>
        <Divider/>
        <div className="grid grid-cols-2 gap-4">
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'size')}} label="Porte" initialValue={formData.size} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'plan')}} label="Plano" initialValue={formData.plan} />
        </div>
        <Divider/>
        <div className="grid grid-cols-2 gap-4">
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'status')}} label="Status" initialValue={formData.status} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'segment')}} label="Segmento" initialValue={formData.segment} />
        </div>
        <Collapse title="Cancelamento">
        <div className="flex flex-col p-1">
        <Input bordered animated color="secondary" type="date" onChange={(e) => {handleFormEdit(e, 'dt_cancel')}} label="Data cancelamento" initialValue={formData.dt_cancel} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cancel_tag')}} label="Motivo cancelamento" initialValue={formData.cancel_tag} />
        <Input bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cancel_factor')}} label="Fator cancelamento" initialValue={formData.cancel_factor} />
        <Textarea bordered animated color="secondary" type="text" onChange={(e) => {handleFormEdit(e, 'cancel_description')}} label="Descrição cancelamento" initialValue={formData.cancel_description} />
        </div>
        </Collapse>
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
        <Button icon={<ArrowPathRoundedSquareIcon width="18px" />} onPress={() => handleFormSubmit(groupId, formData)} color={colorButton}>{messageButton}</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}