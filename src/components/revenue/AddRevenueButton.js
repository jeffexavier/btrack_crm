
import { PencilIcon } from "@/public/icons.js"
import { Button} from "@nextui-org/react"
import { updateRevenue } from "@/src/backend/utils/revenue.js"

export default function AddRevenueButton({revenueRegisterId, formData, formColor, getRevenues}) {

  async function onHandleSubmit(body) {    
    
    const newBody = {}
    
    if (body.request_status === "lost") {
      newBody.group = body.group,
      newBody.request_status = 'lost'
      newBody.request_type = body.request_type,
      newBody.plan = body.plan,
      newBody.request_value = Number(body.request_value).toFixed(2),
      newBody.license_qty = Math.floor(Number(body.license_qty)),
      newBody.dt_request = body.dt_request,
      newBody.request_reason = body.request_reason ? {
        _id: body.request_reason._id
      } : null,
      newBody.request_factor = body.request_factor,
      newBody.request_description = body. request_description
    } else {
      newBody.group = body.group,
      newBody.request_status = 'won'
      newBody.request_type = body.request_type,
      newBody.plan = body.plan,
      newBody.request_value = Number(body.request_value).toFixed(2),
      newBody.license_qty = Math.floor(Number(body.license_qty)),
      newBody.dt_request = body.dt_request,
      newBody.request_reason = null,
      newBody.request_factor = null,
      newBody.request_description = null

    }
    
    // console.log(newBody)
    const updatedRevenue = await updateRevenue(revenueRegisterId, newBody)
    console.log(updatedRevenue)
    getRevenues()
  }
  

  return (    
    <Button auto flat color="secondary" icon={<PencilIcon width="18px" />} onPress={() => onHandleSubmit(formData)}>Adicionar registro</Button>
  )
}