
import { CheckIcon, ExclamationCircleIcon, ExclamationTriangleIcon, PlusIcon } from "@/public/icons.js"
import { Button, Tooltip} from "@nextui-org/react"
import { createRevenue } from "@/src/backend/utils/revenue.js"
import { useState } from "react"


export default function EditRevenueButton({formData, onHandleAddRevenue}) {

  const [textButton, setTextButton] = useState('Adicionar registro')
  const [colorButton, setColorButton] = useState('secondary')
  const [iconButton, setIconButton] = useState((<PlusIcon width="18px" />))

  async function onHandleSubmit(body) {    
    
    if(body.group) {
      const newBody = {}
      
      if (body.request_status === "lost") {
        newBody.group = body.group._id,
        newBody.request_status = 'lost'
        newBody.request_type = body.request_type || "Churn",
        newBody.plan = body.plan,
        newBody.request_value = Number(body.request_value || 0).toFixed(2),
        newBody.license_qty = Math.floor(Number(body.license_qty || 0)),
        newBody.dt_request = body.dt_request,
        newBody.request_reason = body.request_reason ? {
          _id: body.request_reason._id
        } : null,
        newBody.request_factor = body.request_factor,
        newBody.request_description = body.request_description
      } else {
        newBody.group = body.group._id,
        newBody.request_status = 'won'
        newBody.request_type = body.request_type,
        newBody.plan = body.plan,
        newBody.request_value = Number(body.request_value || 0).toFixed(2),
        newBody.license_qty = Math.floor(Number(body.license_qty || 0)),
        newBody.dt_request = body.dt_request,
        newBody.request_reason = null,
        newBody.request_factor = null,
        newBody.request_description = null

      }
      
      // console.log(newBody)
      try {
        
        if(body.request_type) {
          if(body.request_type === "Assinatura" && !body.plan) {
            setTextButton('Escolha um plano!')
            setColorButton('error')
            setIconButton((<ExclamationTriangleIcon width="18px" />))
          } else {
            const createdRevenue = await createRevenue(newBody)
            console.log(createdRevenue)
            onHandleAddRevenue()
  
            setTextButton("Registro adicionado!")
            setColorButton('success')
            setIconButton((<CheckIcon width="18px" />))
          }
        } else {
          setTextButton(`Selecione o tipo de ${body.request_status === 'won' ? "entrada" : "saída"}!`)
          setColorButton('error')
          setIconButton((<ExclamationTriangleIcon width="18px" />))
        }
  
  
        setTimeout(() => {
          setTextButton("Adicionar registro")
          setColorButton('secondary')
          setIconButton((<PlusIcon width="18px" />))
        }, 2000);
      } catch (error) {
        setTextButton('Erro!')
        setColorButton('error')
        setIconButton((<ExclamationTriangleIcon width="18px" />))


        setTimeout(() => {
          setTextButton("Adicionar registro")
          setColorButton('secondary')
          setIconButton((<PlusIcon width="18px" />))
        }, 2000);
      }

    } else {
      setTextButton("Escolha uma empresa!")
      setColorButton('error')
      setIconButton((<ExclamationTriangleIcon width="18px" />))

      setTimeout(() => {
        setTextButton("Adicionar registro")
        setColorButton('secondary')
        setIconButton((<PlusIcon width="18px" />))
      }, 2000);

    }
  }
  

  return (
      <Button auto flat={colorButton === 'error' ? false : true} color={colorButton} icon={iconButton} onPress={() => onHandleSubmit(formData)}>{textButton}</Button>
  )
}