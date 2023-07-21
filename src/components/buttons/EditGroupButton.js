import { PencilSquareIcon } from "@/public/icons.js";
import { Button, Input, Modal, Text} from "@nextui-org/react";
import { useState } from "react";

export default function DetailGroupButton({groupData}) {


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

      onPress={() => setIsVisible(true)}
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
        <Input bordered animated color="secondary" type="date" label="Data fase" initialValue={new Date(groupData.dt_register).toDateString()} />
        <Input bordered animated color="secondary" type="text" label="Nome Fantasia" initialValue={groupData.name_contract} />
        <Input bordered animated color="secondary" type="text" label="Razão Social" initialValue={groupData.name} />
        <Input bordered animated color="secondary" type="text" label="CNPJ" initialValue={groupData.contract_cnpj} />
        <Input bordered animated color="secondary" type="text" label="Status" initialValue={groupData.status} />
        <Input bordered animated color="secondary" type="text" label="CS" initialValue={groupData.cs} />
        <Input bordered animated color="secondary" type="text" label="CSM" initialValue={groupData.csm} />
        <Input bordered animated color="secondary" type="date" label="Data registro" initialValue={formatDate(groupData.dt_register)} />
        <Input bordered animated color="secondary" type="date" label="Data inserção" initialValue={formatDate(groupData.dt_insert)} />
        <Input bordered animated color="secondary" type="text" label="Segmento" initialValue={groupData.segment} />
        <Input bordered animated color="secondary" type="text" label="Cidade" initialValue={groupData.city} />
        <Input bordered animated color="secondary" type="text" label="Estado" initialValue={groupData.state} />
        <Input bordered animated color="secondary" type="text" label="País" initialValue={groupData.coutry} />
        <Input bordered animated color="secondary" type="text" label="Endereço" initialValue={groupData.address} />
        <Input bordered animated color="secondary" type="text" label="Número" initialValue={groupData.address_number} />
        <Input bordered animated color="secondary" type="text" label="Fase" initialValue={groupData.stage} />
        <Input bordered animated color="secondary" type="date" label="Data fase" initialValue={formatDate(groupData.dt_stage)} />
        <Input bordered animated color="secondary" type="text" label="Porte" initialValue={groupData.size} />
        <Input bordered animated color="secondary" type="text" label="Plano" initialValue={groupData.plan} />
        <Input bordered animated color="secondary" type="date" label="Data cancelamento" initialValue={formatDate(groupData.dt_cancel)} />
        <Input bordered animated color="secondary" type="text" label="Motivo cancelamento" initialValue={groupData.cancel_tag} />
        <Input bordered animated color="secondary" type="text" label="Fator cancelamento" initialValue={groupData.cancel_factor} />
        <Input bordered animated color="secondary" type="text" label="Descrição cancelamento" initialValue={groupData.cancel_description} />
      </Modal.Body>
      <Modal.Footer css={{display:"flex", justifyContent:"center"}}>
        <Button color="secondary">Salvar</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}