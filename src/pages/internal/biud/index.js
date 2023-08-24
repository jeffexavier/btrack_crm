import InternalLayout from "@/src/components/InternalLayout.js"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"

export default function Biud() {

  const [newToken, setNewToken] = useState('')
  const [cnpjInput, setCnpjInput] = useState('')

  async function getNewToken(body) {
    const tokenGen = await getToken(body)
    console.log(tokenGen)
  }


  return (
    <>
      <InternalLayout>
        <div className="flex flex-col p-5 gap-4">
          <Input label="CNPJ Válido" placeholder="99.999.999/9999-99" />
          <Button onPress={() => getNewToken(cnpjInput)}>teste</Button>
          <p>{newToken}</p>
        </div>
      </InternalLayout>
    </>
  )
}