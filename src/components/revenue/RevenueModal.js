
import { PencilIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronDoubleDownIcon, HandThumbDownIcon, HandRaisedIcon, XMarkIcon, ChevronDoubleRightIcon, BuildingOffice2Icon, BuildingStorefrontIcon, BuildingOfficeIcon, EyeIcon, FireIcon, ClockIcon, RocketLaunchIcon, XCircleIcon, MinusIcon } from "@/public/icons.js"
import { Button, Modal, Tooltip, Text, Input, Dropdown, Textarea, Divider } from "@nextui-org/react"
import { useState, useEffect } from "react"
import formatDate from "@/src/backend/utils/formatDate.js"
import EditRevenueButton from "./EditRevenueButton.js"

import revenuePlans from './revenuePlans.js'
import { set } from "mongoose"
import AddRevenueButton from "./AddRevenueButton.js"

export default function RevenueModal({revenueData, getRevenues}) {

  const [formData, setFormData] = useState(revenueData ? {...revenueData, group: revenueData.group._id} : {})
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])
  const [requestStatus, setRequestStatus] = useState(false)
  const [formColor, setFormColor] = useState("success")


  const [isVisible, setIsVisible] = useState(false)
  
  function openModal(){
    setIsVisible(true)
    setFormData(revenueData ? {...revenueData, group: revenueData.group._id} : {})
    onHandleFormStatusInputEdit((revenueData ? revenueData.request_status : "won"), 'request_status')
  }

  async function getRevenueRequestReasons() {
    const revenueRequestReasonList = await fetch('/api/revenuerequestreason').then((response) => {
      return response.json()
    })
    setListedRevenueRequestReasons(revenueRequestReasonList.value)
  }
  
  function onHandleFormDataInputEdit(e, name) {
    setFormData( {...formData, 
      [name]: e.target.value
    })
  }

  function onHandleFormStatusInputEdit(status, name) {

    const value = {number: formData.request_value}
    const license_qty = {number: formData.license_qty}


    if(status === 'won') {
      setRequestStatus(false)
      setFormColor('success')
      if(formData.request_type === 'Downsell') {
        setFormData({...formData, request_type: 'Upsell'})
      } else if(formData.request_type === 'Churn') {
        setFormData({...formData, request_type: 'Assinatura'})
      }

      if(Math.sign(formData.request_value) === -1) {
        value.number = value.number * -1
      }

      if(Math.sign(formData.license_qty) === -1) {
        license_qty.number = license_qty.number * -1
      }

    } else if(status === 'lost') {
      setRequestStatus(true)
      setFormColor('error')
      if(formData.request_type === 'Upsell') {
        setFormData({...formData, request_type: 'Downsell'})
      } else if(formData.request_type === 'Assinatura') {
        setFormData({...formData, request_type: 'Churn'})
      }

      if(Math.sign(formData.request_value) === 1) {
        value.number = value.number * -1
      }

      if(Math.sign(formData.license_qty) === 1) {
        license_qty.number = license_qty.number * -1
      }1
    }


    setFormData({...formData, [name]: status, request_value: value.number, license_qty: license_qty.number})

  }

  function onHandleFormDataInputValueEdit(e, name) {

    if(formData.request_status === "lost") {
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
    } else if(formData.request_status === "won") {
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

  function onChangeSelectType(e) {    
    setFormData({...formData, request_type: e})
  }

  function onChangeSelectPlan(index) {
    setFormData({...formData, plan: revenuePlans[index].value})
  }
  
  function onChangeSelectRequestReason(index) {
    setFormData({
      ...formData,
      request_reason: {...listedRevenueRequestReasons[index]}
    })
    // console.log(listedRevenueRequestReasons[index])
  }

  function onChangeSelectRequestFactor(e) {
    setFormData({...formData, request_factor: e})
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
        <div className="flex flex-col text-left min-w-full">
        {revenueData ? 
        <>
          <Text h5>Edição de registro</Text>
          <Text h4>{revenueData.group.name_contract}</Text>
        </>
        :
        <>
        <Text h5>Adição de registro</Text>
        </>
        }
        </div>
        </Modal.Header>
        <Modal.Body>
        <div className="flex gap-2">
          <Button ghost={requestStatus} size="sm" auto color="success" icon={<PlusIcon width="18px" />} onPress={() => onHandleFormStatusInputEdit("won", "request_status")}>Entrada</Button>
          <Button ghost={!requestStatus} size="sm" auto color="error" icon={<MinusIcon width="18px" />} onPress={() => onHandleFormStatusInputEdit("lost", "request_status")}>Saída</Button>
        </div>
          <Input bordered color={formColor} type="text" readOnly label="Empresa" onChange={(e) => onHandleFormDataInputEdit(e, "name_contract")} initialValue={revenueData ? revenueData.group.name_contract : ''}></Input>
          <Input bordered color={formColor} type="text" readOnly label="Porte" onChange={(e) => onHandleFormDataInputEdit(e, "size")} initialValue={revenueData ? revenueData.group.size : ''}></Input>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={formColor}>Tipo</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color={formColor} bordered>{formData.request_type}</Button>
            </Dropdown.Trigger>
            {requestStatus === false ?
            <Dropdown.Menu onAction={(e) => {onChangeSelectType(e)}}>         
                  <Dropdown.Item color="primary" icon={<ChevronUpIcon width="18px" />} key="Assinatura">Assinatura</Dropdown.Item>
                  <Dropdown.Item color="success" icon={<ChevronDoubleUpIcon width="18px" />} key="Upsell">Upsell</Dropdown.Item>
                  <Dropdown.Item color="secondary" withDivider icon={<ChevronDoubleRightIcon width="18px" />} key="Migração">Migração</Dropdown.Item>
            </Dropdown.Menu>
            :
            <Dropdown.Menu onAction={(e) => {onChangeSelectType(e)}}>     
                  <Dropdown.Item color="secondary" icon={<ChevronDoubleRightIcon width="18px" />} key="Migração">Migração</Dropdown.Item>
                  <Dropdown.Item color="warning" withDivider icon={<ChevronDoubleDownIcon width="18px" />} key="Downsell">Downsell</Dropdown.Item>
                  <Dropdown.Item color="error" icon={<ChevronDownIcon width="18px" />} key="Churn">Churn</Dropdown.Item>
            </Dropdown.Menu>
              }   
          </Dropdown>
          {formData.request_type === "Migração" ? 
          <>
          <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={formColor}>Plano</Text>
          <Dropdown isBordered>
            <Dropdown.Trigger>
              <Button color={formColor} bordered >{formData.plan || ''}</Button>
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
            <Input bordered color={formColor} type="number" label="Valor" onChange={(e) => onHandleFormDataInputValueEdit(e, "request_value")} step={.01} value={formData.request_value}></Input>
            <Input bordered color={formColor} type="number" label="Assinaturas" onChange={(e) => onHandleFormDataInputValueEdit(e, "license_qty")} value={formData.license_qty}></Input>
          </div>
          <Input bordered color={formColor} type="date" label="Data do registro" onChange={(e) => onHandleFormDataInputEdit(e, "dt_request")} initialValue={formatDate(revenueData ? revenueData.dt_request : new Date())}></Input>
          {formData.request_status === "lost" ? <> 
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={formColor}>Motivo</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button auto color={formColor} bordered>{formData.request_reason ? formData.request_reason.value : ''}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu color={formColor} onAction={(e) => onChangeSelectRequestReason(e)}>
                  {listedRevenueRequestReasons.map((item, index) => (
                    <Dropdown.Item key={index}>{item.value}</Dropdown.Item>
                    )
                  )}
                  {/* <Dropdown.Item withDivider color="secondary" variant="solid" icon={<PlusIcon width="18px"/>}>Adicionar outro motivo</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
              <Text size={15} css={{marginLeft: "5px", marginBottom: "0px"}} color={formColor}>Fator</Text>
              <Dropdown isBordered>
                <Dropdown.Trigger>
                  <Button color={formColor} bordered>{formData.request_factor || ''}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onChangeSelectRequestFactor(e)}>
                    <Dropdown.Item color="warning" icon={<HandRaisedIcon width="18px" />} key="Incontrolável">Incontrolável</Dropdown.Item>
                    <Dropdown.Item color="error" icon={<HandThumbDownIcon width="18px" />} key="Controlável">Controlável</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            <Textarea bordered color={formColor} type="text" label="Descrição" onChange={(e) => onHandleFormDataInputEdit(e, "request_description")} initialValue={formData.request_description}></Textarea>
          </> :
          "" }
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-4">
            <Button light auto color="error" icon={<XCircleIcon width="18px" />} onPress={() => setIsVisible(false)}>Cancelar</Button>
            {revenueData ?
            <EditRevenueButton revenueRegisterId={revenueData._id} formData={formData} getRevenues={getRevenues}/>
            :
            <AddRevenueButton formData={formData} getRevenues={getRevenues}/>
            }
          </div>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}