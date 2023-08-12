
import { PencilIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronDoubleDownIcon, HandThumbDownIcon, HandRaisedIcon, XMarkIcon, ChevronDoubleRightIcon, BuildingOffice2Icon, BuildingStorefrontIcon, BuildingOfficeIcon, EyeIcon, FireIcon, ClockIcon, RocketLaunchIcon, XCircleIcon } from "@/public/icons.js"
import { Button, Modal, Tooltip, Text, Input, Dropdown, Textarea } from "@nextui-org/react"
import { useState, useEffect } from "react"
import formatDate from "@/src/backend/utils/formatDate.js"
import EditRevenueButton from "./EditRevenueButton.js"

import revenuePlans from './revenuePlans.js'

export default function RevenueModal({getRevenues, setIsVisible, isVisible}) {

  const [formData, setFormData] = useState({})
  
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])
  const [listedGroups, setListedGroups] = useState([])


  const [selectedType, setSelectedType] = useState('')
  const [selectedTypeColor, setSelectedTypeColor] = useState('secondary')

  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedPlanColor, setSelectedPlanColor] = useState('secondary')

  const [selectedRequestReason, setSelectedRequestReason] = useState('')

  const [selectedRequestFactor, setSelectedRequestFactor] = useState('Incontrolável')
  const [selectedRequestFactorColor, setSelectedRequestFactorColor] = useState('')

  async function getRevenueRequestReasons() {
    const revenueRequestReasonList = await fetch('/api/revenuerequestreason').then((response) => {
      return response.json()
    })
    setListedRevenueRequestReasons(revenueRequestReasonList.value)
  }

  async function getGroups() {
    const groupList = await fetch('/api/group').then((response) => {
      return response.json();
    })

    console.log(groupList)
    setListedGroups(groupList.value)
  }
  
  function onHandleFormDataInputEdit(e, name) {
    e.preventDefault()
    setFormData( {...formData, 
      [name]: e.target.value
    })

    console.log(e.target.value)
  }

  function onHandleFormDataInputValueEdit(e, name) {
    
    const number = e.target.value

    if(formData.type === "Downsell" || formData.type === "Churn") {
      if(Math.sign(e.target.value) === 1) {
        setFormData( {...formData, 
          [name]: e.target.value * -1
        })
      } else if(Math.sign(e.target.value) === -1) {
        setFormData( {...formData, 
          [name]: e.target.value
        })
      } else {
        setFormData( {...formData, 
          [name]: e.target.value
        })
      }
    } else if(formData.type === "Entrada" || formData.type === "Upsell") {
      if(Math.sign(e.target.value) === -1) {
        setFormData( {...formData, 
          [name]: e.target.value * -1
        })
      } else if(Math.sign(e.target.value) === 1) {
        setFormData( {...formData, 
          [name]: e.target.value
        })
      } else {
        setFormData( {...formData, 
          [name]: e.target.value
        })
      }
    }

 

    console.log(formData)

  }


  function openModal(){
    getRevenueRequestReasons();
    setIsVisible(true)    
  }

  function onChangeSelectGroup(index) {
    setFormData({
      ...formData,
      group: {...listedGroups[index]}
    })
    console.log(formData)
  }

  function onChangeSelectType(e) {
    const value = {number: formData.value}
    
    if(e === "Downsell" || e === "Churn") {
      if(Math.sign(formData.value) === 1) {
        // setFormData({...formData, 
        //   value: formData.value * -1
        // })

        value.number = value.number * -1
      } else if(Math.sign(formData.value) === -1) {
        // setFormData({...formData, 
        //   value: formData.value
        // })
        
      }
    } else if(e === "Entrada" || e === "Upsell") {
      if(Math.sign(formData.value) === -1) {
        // setFormData({...formData, 
        //   value: formData.value * -1
        // })
        value.number = value.number * -1
      } else if(Math.sign(formData.value) === 1) {
        // setFormData({...formData, 
        //   value: formData.value
        // })
      }
    }
    console.log(value)
    
    setFormData({...formData, type: e, value: value.number})
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
    getGroups();
    onChangeSelectTypeColor(selectedType);
    onChangeSelectRequestFactorColor(selectedRequestFactor);
  }, [])

  
  return (
    <>
      <Modal
        aria-labelledby="modal-edit-revenue"
        closeButton
        onClose={() => setIsVisible(false)}
        open={isVisible}
      >
        <Modal.Header>
        <div className="flex text-left">
          <Text className="text-left" h5>Novo registro</Text>
        </div>
        </Modal.Header>
        <Modal.Body>
        <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={selectedTypeColor}>Empresa</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button auto color="secondary" bordered>{formData.group ? formData.group.name_contract : ''}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onChangeSelectGroup(e)}>
                  {listedGroups.map((item, index) => (
                    <Dropdown.Item color="secondary" key={index}>{item.name_contract}</Dropdown.Item>
                    )
                  )}
                  <Dropdown.Item withDivider color="secondary" icon={<PlusIcon width="18px"/>}>Adicionar outro motivo</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          <Input bordered color="secondary" type="text" readOnly label="Porte" onChange={(e) => onHandleFormDataInputEdit(e, "size")} initialValue={formData.group ? formData.group.size : ''}></Input>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={selectedTypeColor}>Tipo</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color={selectedTypeColor} bordered>{formData.type || ''}</Button>
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
            <Input bordered color={selectedTypeColor} type="number" label="Valor" onChange={(e) => onHandleFormDataInputValueEdit(e, "value")} step={.01}></Input>
            <Input bordered color={selectedTypeColor} type="number" label="Assinaturas" onChange={(e) => onHandleFormDataInputEdit(e, "license_qty")}></Input>
          </div>
          <Input bordered color={selectedTypeColor} type="date" label="Data do registro" onChange={(e) => onHandleFormDataInputEdit(e, "dt_request")}></Input>
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
            <Textarea bordered color={selectedTypeColor} type="text" label="Descrição" onChange={(e) => onHandleFormDataInputEdit(e, "request_description")}></Textarea>
          </> :
          "" }
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-4">
            <Button flat auto color="error" icon={<XCircleIcon width="18px" />} onPress={() => setIsVisible(false)}>Cancelar</Button>
          </div>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}