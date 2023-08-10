
import { PencilIcon } from "@/public/icons.js"
import { Button} from "@nextui-org/react"
import { updateRevenue } from "@/src/backend/utils/revenue.js"

export default function EditRevenueButton({revenueRegisterId, formData, getRevenues}) {

  async function onHandleSubmit(body) {    
    
    const newBody = {}
    
    if (body.type === "Downsell" || body.type === "Churn") {
      newBody.group = body.group,
      newBody.type = body.type,
      newBody.plan = body.plan,
      newBody.value = body.value,
      newBody.license_qty = body.license_qty,
      newBody.dt_request = body.dt_request,
      newBody.request_reason = {
        _id: body.request_reason._id
      },
      newBody.request_factor = body.request_factor,
      newBody.request_description = body. request_description
    } else {
      newBody.group = body.group,
      newBody.type = body.type,
      newBody.plan = body.plan,
      newBody.value = body.value,
      newBody.license_qty = body.license_qty,
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
    <Button auto color="secondary" icon={<PencilIcon width="18px" />} onPress={() => onHandleSubmit(formData)}>Editar registro</Button>
  )
}