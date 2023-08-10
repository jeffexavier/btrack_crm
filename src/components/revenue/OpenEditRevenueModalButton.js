
import { PencilIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronDoubleDownIcon, HandThumbDownIcon, HandRaisedIcon, XMarkIcon, ChevronDoubleRightIcon, BuildingOffice2Icon, BuildingStorefrontIcon, BuildingOfficeIcon, EyeIcon, FireIcon, ClockIcon, RocketLaunchIcon, XCircleIcon } from "@/public/icons.js"
import { Button, Modal, Tooltip, Text, Input, Dropdown, Textarea } from "@nextui-org/react"
import { useState, useEffect } from "react"
import formatDate from "@/src/backend/utils/formatDate.js"
import EditRevenueButton from "./EditRevenueButton.js"

import revenuePlans from './revenuePlans.js'

export default function OpenEditRevenueModalButton({revenueData, getRevenues}) {

  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({...revenueData, group: revenueData.group._id})
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])

  const [selectedType, setSelectedType] = useState(revenueData.type)
  const [selectedTypeColor, setSelectedTypeColor] = useState('secondary')

  const [selectedPlan, setSelectedPlan] = useState(revenueData.plan)
  const [selectedPlanColor, setSelectedPlanColor] = useState('secondary')

  const [selectedRequestReason, setSelectedRequestReason] = useState(revenueData.request_reason)

  const [selectedRequestFactor, setSelectedRequestFactor] = useState(revenueData.request_factor || 'Incontrolável')
  const [selectedRequestFactorColor, setSelectedRequestFactorColor] = useState('')



  async function getRevenueRequestReasons() {
    const revenueRequestReasonList = await fetch('/api/revenuerequestreason').then((response) => {
      return response.json()
    })
    setListedRevenueRequestReasons(revenueRequestReasonList.value)
  }
  
  function onHandleFormDataInputEdit(e, name) {
    e.preventDefault()
    setFormData( {...formData, 
      [name]: e.target.value
    })

    console.log(e.target.value)
  }

  function openModal(){
    getRevenueRequestReasons();
    setIsVisible(true)    
  }

  function onChangeSelectType(e) {
    setFormData({...formData, type: e})
    onChangeSelectTypeColor(e)
  }

  function onChangeSelectTypeColor(e) {
    switch (e) {
      case "Entrada":
        setSelectedTypeColor('primary')
        break;
      case "Upsell":
        setSelectedTypeColor('success')
        break;
      case 'Migração':
        setSelectedTypeColor('secondary')
        break;
      case 'Downsell':
        setSelectedTypeColor('warning')
        break;
      case 'Churn':
        setSelectedTypeColor('error')
        break;
     }
  }

  function onChangeSelectPlan(index) {
    setSelectedPlan(revenuePlans[index])    
    setFormData({...formData, plan: revenuePlans[index].value})
    console.log(revenuePlans[index])
    onChangeSelectPlanColor(revenuePlans[index].value)
  }

  function onChangeSelectPlanColor(e) {
    switch (e) {
      case "Free":
        setSelectedPlanColor('error')
        break;
      case "Trial":
        setSelectedPlanColor('warning')
        break;
      case 'POC':
        setSelectedPlanColor('warning')
        break;
      case 'Basic':
        setSelectedPlanColor('primary')
        break;
      case 'Pro':
        setSelectedPlanColor('success')
        break;
      case 'Enterprise':
        setSelectedPlanColor('secondary')
        break;
     }
  }
  
  function onChangeSelectRequestReason(index) {
    setFormData({
      ...formData,
      request_reason: {...listedRevenueRequestReasons[index]}
    })
    console.log(listedRevenueRequestReasons[index])
  }

  function onChangeSelectRequestFactor(e) {
    setFormData({...formData, request_factor: e})
    onChangeSelectRequestFactorColor(e)
  }

  function onChangeSelectRequestFactorColor(e) {
    switch (e) {
      case "Incontrolável":
        setSelectedRequestFactorColor('warning')
        break;
      case "Controlável":
        setSelectedRequestFactorColor('error')
        break;
     }
  }

  useEffect(() => {
    getRevenueRequestReasons();
    onChangeSelectTypeColor(selectedType)
    onChangeSelectRequestFactorColor(selectedRequestFactor)
  }, [])

  
  return (
    <>
      <Tooltip color="secondary" placement="top" content="Editar registro" >
        <Button auto light color="secondary" icon={<PencilIcon width="18px"/>} onPress={() => openModal()}/>
      </Tooltip>
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
          <Input bordered color="secondary" type="text" readOnly label="Empresa" onChange={(e) => onHandleFormDataInputEdit(e, "name_contract")} initialValue={revenueData.group.name_contract}></Input>
          <Input bordered color="secondary" type="text" readOnly label="Porte" onChange={(e) => onHandleFormDataInputEdit(e, "size")} initialValue={revenueData.group.size}></Input>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={selectedTypeColor}>Tipo</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color={selectedTypeColor} bordered>{formData.type}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onAction={(e) => {onChangeSelectType(e)}}>
                <Dropdown.Item color="primary" icon={<ChevronUpIcon width="18px" />} key={"Entrada"}>Entrada</Dropdown.Item>
                <Dropdown.Item color="success" icon={<ChevronDoubleUpIcon width="18px" />} key="Upsell">Upsell</Dropdown.Item>
                <Dropdown.Item color="secondary" withDivider icon={<ChevronDoubleRightIcon width="18px" />} key="Migração">Migração</Dropdown.Item>
                <Dropdown.Item color="warning" withDivider icon={<ChevronDoubleDownIcon width="18px" />} key="Downsell">Downsell</Dropdown.Item>
                <Dropdown.Item color="error" icon={<ChevronDownIcon width="18px" />} key="Churn">Churn</Dropdown.Item>   
            </Dropdown.Menu>
          </Dropdown>
          {formData.type === "Migração" ? 
          <>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={selectedPlanColor}>Plano</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color={selectedPlanColor} bordered >{formData.plan}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onAction={(e) => onChangeSelectPlan(e)}>
              {revenuePlans.map((item, index) => (
                <Dropdown.Item color={item.color} icon={item.icon("18px")} key={index}>{item.value}</Dropdown.Item>
              ))}                  
            </Dropdown.Menu>
          </Dropdown>    
          </> : ""
          }
      
          <div className="flex gap-4">
            <Input bordered color={selectedTypeColor} type="number" label="Valor" onChange={(e) => onHandleFormDataInputEdit(e, "value")} initialValue={revenueData.value}></Input>
            <Input bordered color={selectedTypeColor} type="number" label="Assinaturas" onChange={(e) => onHandleFormDataInputEdit(e, "license_qty")} initialValue={revenueData.license_qty}></Input>
          </div>
          <Input bordered color={selectedTypeColor} type="date" label="Data do registro" onChange={(e) => onHandleFormDataInputEdit(e, "dt_request")} initialValue={formatDate(revenueData.dt_request)}></Input>
          {formData.type === "Downsell" || formData.type === "Churn" ? <> 
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={selectedTypeColor}>Motivo</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button auto color={selectedTypeColor} bordered>{formData.request_reason ? formData.request_reason.value: ''}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onChangeSelectRequestReason(e)}>
                  {listedRevenueRequestReasons.map((item, index) => (
                    <Dropdown.Item color={selectedTypeColor} key={index}>{item.value}</Dropdown.Item>
                    )
                  )}
                  <Dropdown.Item withDivider color="secondary" icon={<PlusIcon width="18px"/>}>Adicionar outro motivo</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={selectedRequestFactorColor}>Fator</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button color={selectedRequestFactorColor} bordered>{formData.request_factor || selectedRequestFactor}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onChangeSelectRequestFactor(e)}>
                    <Dropdown.Item color="warning" icon={<HandRaisedIcon width="18px" />} key="Incontrolável">Incontrolável</Dropdown.Item>
                    <Dropdown.Item color="error" icon={<HandThumbDownIcon width="18px" />} key="Controlável">Controlável</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            <Textarea bordered color={selectedTypeColor} type="text" label="Descrição" onChange={(e) => onHandleFormDataInputEdit(e, "request_description")} initialValue={formData.request_description}></Textarea>
          </> :
          "" }
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-4">
            <Button flat auto color="error" icon={<XCircleIcon width="18px" />} onPress={() => setIsVisible(false)}>Cancelar</Button>
            <EditRevenueButton revenueRegisterId={revenueData._id} formData={formData} getRevenues={getRevenues}/>
          </div>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}