import InternalLayout from "@/src/components/InternalLayout.js"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { createTokenBiud } from "@/src/backend/utils/biud.js"
import { DocumentDuplicateIcon } from "@/public/icons.js"

import UploadBiudPurchasesButton from "@/src/components/biud/UploadBiudPurchasesButton.js"
import UploadBiudCustomersButton from "@/src/components/biud/UploadBiudCustomersButton.js"
import DownloadListButton from "@/src/components/buttons/DowloadListButton.js"

export default function Biud() {

  const [newToken, setNewToken] = useState('')
  const [cnpjInput, setCnpjInput] = useState('')

  function onHandleInput(e) {
    setCnpjInput(e.target.value)
    console.log(e.target.value)
  }
  
  async function getNewToken(body) {
    const tokenGen = await createTokenBiud(body)
    setNewToken(tokenGen.data.token)
    console.log(tokenGen)
  }

  const purchaseBody = {
    total_value: {type: "number"},
    discount: {type: "number"},
    nfe: {type: "string"},
    date: {type: "date"},
    observation: {type: "string"},
    customer_cpf: {type: "string"},
    customer_forceUpdateData: {type: "boolean"},
    customer_name: {type: "string"},
    customer_phone: {type: "string"},
    customer_email: {type: "string"},
    customer_gender: {type: "string"},
    customer_born_at: {type: "date"},
    customer_address_postal_code: {type: "string"},
    customer_address_street: {type: "string"},
    customer_address_district: {type: "string"},
    customer_address_complement: {type: "string"},
    customer_address_number: {type: "string"},
    customer_address_city: {type: "string"},
    customer_address_uf: {type: "string"},
    products_code: {type: "string"},
    products_discount: {type: "number"},
    products_description: {type: "string"},
    products_quantity: {type: "number"},
    products_cfop: {type: "number"},
    products_value: {type: "number"}
  }
  
  const customerBody = {
    cpf: {type: "string"},
    name: {type: "string"},
    email: {type: "string"},
    phone: {type: "string"},
    bornAt: {type: "date"},
    gender: {type: "string"},
    forceUpdateData: {type: "boolean"},
    address_postal_code: {type: "string"},
    address_street: {type: "string"},
    address_district: {type: "string"},
    address_complement: {type: "string"},
    address_number: {type: "string"},
    address_city: {type: "string"},
    address_uf: {type: "string"}
  }

  return (
    <>
      <InternalLayout>
        <div className="flex flex-col p-5 gap-4">
          <Input bordered aria-hidden color="secondary" label="CNPJ Válido" placeholder="99.999.999/9999-99" maxLength={14} onChange={(e) => onHandleInput(e)}/>
          <Button flat color="secondary" onPress={() => getNewToken(cnpjInput)}>teste</Button>
          {newToken ?
            <>
              <Input readOnly color="secondary" value={newToken} contentRight={<Button light auto color="secondary" icon={<DocumentDuplicateIcon width="18px" />} />}/>
              <UploadBiudPurchasesButton list={purchaseBody} createFunction={() => "Foi aqui!"} tokenBiud={newToken}/>
              <UploadBiudCustomersButton list={customerBody} createFunction={() => "Foi aqui!"} tokenBiud={newToken}/>
            </> 
          : ""
          }
        </div>
      </InternalLayout>
    </>
  )
}