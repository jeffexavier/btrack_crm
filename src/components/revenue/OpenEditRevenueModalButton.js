
import { PencilIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronDoubleDownIcon, HandThumbDownIcon, HandRaisedIcon, XMarkIcon, ChevronDoubleRightIcon, BuildingOffice2Icon, BuildingStorefrontIcon, BuildingOfficeIcon, EyeIcon, FireIcon, ClockIcon, RocketLaunchIcon, XCircleIcon, MinusIcon } from "@/public/icons.js"
import { Button, Modal, Tooltip, Text, Input, Dropdown, Textarea } from "@nextui-org/react"
import { useState, useEffect } from "react"
import formatDate from "@/src/backend/utils/formatDate.js"
import EditRevenueButton from "./EditRevenueButton.js"

import revenuePlans from './revenuePlans.js'

export default function OpenEditRevenueModalButton({revenueData, getRevenues}) {

  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({...revenueData, group: revenueData.group._id})
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])


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
  }

  function onHandleFormDataInputValueEdit(e, name) {

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
    } else {
      setFormData( {...formData, 
        [name]: e.target.value
      })
    }

  }


  function openModal(){
    getRevenueRequestReasons();
    setFormData(revenueData)
    onChangeSelectType(revenueData.type)

    setIsVisible(true)    
  }

  function onChangeSelectType(e) {
    const value = {number: formData.request_value}
    const license_qty = {number: formData.license_qty}
    
    if(e === "Downsell" || e === "Churn") {
      if(Math.sign(formData.request_value) === 1) {
        value.number = value.number * -1
      }

      if(Math.sign(formData.license_qty) === 1) {
        license_qty.number = license_qty.number * -1
      }
    } else if(e === "Entrada" || e === "Upsell") {
      if(Math.sign(formData.request_value) === -1) {
        value.number = value.number * -1
      }

      if(Math.sign(formData.license_qty) === -1) {
        license_qty.number = license_qty.number * -1
      }
    }
    console.log(value)
    
    setFormData({...formData, request_type: e, request_value: value.number, license_qty: license_qty.number})
  }

  function onChangeSelectPlan(index) {
    setSelectedPlan(revenuePlans[index])

    setFormData({...formData, plan: revenuePlans[index].value})
  }
  
  function onChangeSelectRequestReason(index) {
    setFormData({
      ...formData,
      request_reason: {...listedRevenueRequestReasons[index]}
    })
    console.log(listedRevenueRequestReasons[index])
  }



  useEffect(() => {
    getRevenueRequestReasons();
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
        <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Tipo</Text>
        <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color="secondary" bordered>{formData.request_type}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onAction={(e) => {onChangeSelectType(e)}}>
                <Dropdown.Item color="primary" icon={<PlusIcon width="18px" />} key="Entrada">Entrada</Dropdown.Item>
                <Dropdown.Item color="success" icon={<MinusIcon width="18px" />} key="Saída">Saída</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Input bordered color="secondary" type="text" readOnly label="Empresa" onChange={(e) => onHandleFormDataInputEdit(e, "name_contract")} initialValue={revenueData.group.name_contract}></Input>
          <Input bordered color="secondary" type="text" readOnly label="Porte" onChange={(e) => onHandleFormDataInputEdit(e, "size")} initialValue={revenueData.group.size}></Input>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Tipo</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color="secondary" bordered>{formData.request_type}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onAction={(e) => {onChangeSelectType(e)}}>
                <Dropdown.Item color="primary" icon={<ChevronUpIcon width="18px" />} key="Assinatura">Assinatura</Dropdown.Item>
                <Dropdown.Item color="success" icon={<ChevronDoubleUpIcon width="18px" />} key="Upsell">Upsell</Dropdown.Item>
                <Dropdown.Item color="secondary" withDivider icon={<ChevronDoubleRightIcon width="18px" />} key="Migração">Migração</Dropdown.Item>
                <Dropdown.Item color="warning" withDivider icon={<ChevronDoubleDownIcon width="18px" />} key="Downsell">Downsell</Dropdown.Item>
                <Dropdown.Item color="error" icon={<ChevronDownIcon width="18px" />} key="Churn">Churn</Dropdown.Item>   
            </Dropdown.Menu>
          </Dropdown>
          {formData.type === "Migração" ? 
          <>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Plano</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color="secondary" bordered >{formData.plan}</Button>
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
            <Input bordered color="secondary" type="number" label="Valor" onChange={(e) => onHandleFormDataInputValueEdit(e, "request_value")} step={.01} value={formData.request_value}></Input>
            <Input bordered color="secondary" type="number" label="Assinaturas" onChange={(e) => onHandleFormDataInputValueEdit(e, "license_qty")} value={formData.license_qty}></Input>
          </div>
          <Input bordered color="secondary" type="date" label="Data do registro" onChange={(e) => onHandleFormDataInputEdit(e, "dt_request")} initialValue={formatDate(revenueData.dt_request)}></Input>
          {formData.type === "Downsell" || formData.type === "Churn" ? <> 
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Motivo</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button auto color="secondary" bordered>{formData.request_reason ? formData.request_reason.value: ''}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onChangeSelectRequestReason(e)}>
                  {listedRevenueRequestReasons.map((item, index) => (
                    <Dropdown.Item color="secondary" key={index}>{item.value}</Dropdown.Item>
                    )
                  )}
                  <Dropdown.Item withDivider color="secondary" icon={<PlusIcon width="18px"/>}>Adicionar outro motivo</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color="secondary">Fator</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button color="secondary" bordered>{formData.request_factor || selectedRequestFactor}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onChangeSelectRequestFactor(e)}>
                    <Dropdown.Item color="warning" icon={<HandRaisedIcon width="18px" />} key="Incontrolável">Incontrolável</Dropdown.Item>
                    <Dropdown.Item color="error" icon={<HandThumbDownIcon width="18px" />} key="Controlável">Controlável</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            <Textarea bordered color="secondary" type="text" label="Descrição" onChange={(e) => onHandleFormDataInputEdit(e, "request_description")} initialValue={formData.request_description}></Textarea>
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