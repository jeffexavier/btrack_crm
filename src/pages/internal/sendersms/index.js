import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/sensedata/Layout.js";
import { Input, Textarea, Text, Button } from "@nextui-org/react";
import { useState } from "react";


export default function SenderSms() {

  const [textLength, setTextLength] = useState(0)
  const [textInput, setTextInput] = useState("")
  const [textLimit, setTextLimit] = useState(false)

  function putLimit(e){
    if(e.target.value.length > 160) {
      setTextLimit(true)
    } else {
      setTextInput(e.target.value)
      setTextLength(e.target.value.length)
      setTextLimit(false)
    }
  }

  function verifyText() {
    console.log(textInput, textInput.length)
  }

  return (
    <InternalLayout>
        <Layout>
    <div>
        <div>
            <Textarea type="text" label="ID" onChange={(e) => putLimit(e)} value={textInput}/>
            <Button onPress={verifyText}>verificar</Button>
        </div>
        <div>
          <Text h3>{textLength} / 160</Text>
        </div>
    </div>
        </Layout>
    </InternalLayout>
)
}