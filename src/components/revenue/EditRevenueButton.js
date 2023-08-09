
import { PencilIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronDoubleDownIcon, HandThumbDownIcon, HandRaisedIcon, XMarkIcon } from "@/public/icons.js"
import { Button, Modal, Tooltip, Text, Input, Dropdown, Textarea } from "@nextui-org/react"
import { useState, useEffect } from "react"
import formatDate from "@/src/backend/utils/formatDate.js"

export default function EditRevenueButton({revenueData}) {

  const [isVisible, setIsVisible] = useState(false)
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])



  async function getRevenueRequestReasons() {
    const revenueRequestReasonList = await fetch('/api/revenuerequestreason').then((response) => {
      return response.json()
    })
    setListedRevenueRequestReasons(revenueRequestReasonList.value)
  }
  
  function onHandleSubmit(body) {
    setIsVisible(true)
    console.log(body)
  }

  useEffect(() => {
    getRevenueRequestReasons();
  }, [])

  
  return (
    <>
      <Tooltip color="secondary" placement="left" content="Editar registro" >
        <Button auto light color="secondary" icon={<PencilIcon width="18px"/>} onPress={() => onHandleSubmit(revenueData.group.name_contract)}/>

      <Modal
        aria-labelledby="modal-edit-revenue"
        closeButton
        onClose={() => setIsVisible(false)}
        open={isVisible}
      >
        <Modal.Header>
          <Text h5>Edição de registro referente à {revenueData.group.name_contract}</Text>
        </Modal.Header>
        <Modal.Body>
          <Input bordered color="secondary" type="text" readOnly label="Empresa" initialValue={revenueData.group.name_contract}></Input>
          <div className="flex gap-4">
            <Input bordered color="secondary" type="text" readOnly label="Porte" initialValue={revenueData.group.size}></Input>
            <Input bordered color="secondary" type="text" label="Plano" initialValue={revenueData.plan}></Input>
          </div>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="success">Tipo</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color="success" bordered>Abrir dropdown</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu color="secondary">
                <Dropdown.Item color="primary" icon={<ChevronUpIcon width="18px" />}>Entrada</Dropdown.Item>
                <Dropdown.Item color="success" icon={<ChevronDoubleUpIcon width="18px" />}>Upsell</Dropdown.Item>
                <Dropdown.Item color="warning" withDivider icon={<ChevronDoubleDownIcon width="18px" />}>Downsell</Dropdown.Item>
                <Dropdown.Item color="error" icon={<ChevronDownIcon width="18px" />}>Churn</Dropdown.Item>   
            </Dropdown.Menu>
          </Dropdown>
          <div className="flex gap-4">
            <Input bordered color="secondary" type="number" label="Valor" initialValue={revenueData.value}></Input>
            <Input bordered color="secondary" type="number" label="Assinaturas" initialValue={revenueData.license_qty}></Input>
          </div>
          <Input bordered color="secondary" type="date" label="Data do registro" initialValue={formatDate(revenueData.dt_request)}></Input>
          <div className="flex gap-4">
            <div>
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Motivo</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button auto color="secondary" bordered>Abrir dropdown</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu color="secondary">
                  {listedRevenueRequestReasons.map((item, index) => (
                    <Dropdown.Item key={index}>{item.value}</Dropdown.Item>
                    )
                  )}
                  <Dropdown.Item withDivider color="secondary" icon={<PlusIcon width="18px"/>}>Adicionar outro motivo</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Fator</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button color="secondary" bordered>Abrir dropdown</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu color="secondary">
                    <Dropdown.Item color="warning" icon={<HandRaisedIcon width="18px" />}>Incontrolável</Dropdown.Item>
                    <Dropdown.Item color="error" icon={<HandThumbDownIcon width="18px" />}>Controlável</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Textarea bordered color="secondary" type="text" label="Descrição" initialValue={revenueData.request_description}></Textarea>
        </Modal.Body>
        <Modal.Footer>
        <div className="flex justify-end gap-4">
          <Button auto color="error" icon={<XMarkIcon width="18px" />} onPress={() => setIsVisible(false)}>Cancelar</Button>
          <Button auto color="secondary" icon={<PencilIcon width="18px" />}>Editar registro</Button>
        </div>
        </Modal.Footer>
      </Modal>
      </Tooltip>
    </>
  )
}