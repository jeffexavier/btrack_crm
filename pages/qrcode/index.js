import { Button, Input, Image } from "@nextui-org/react";
import { useState } from "react";

export default function Index() {

    const [inputLink, setInputLink] = useState('')
    const [link, setLink] = useState('')

    function setNewLink() {
    setLink(inputLink)
    console.log(inputLink)
    }

    return (
        <div className="flex flex-col gap-3 p-5">
            <Input id="input-link" placeholder="Link do site aqui" onChange={(e) => setInputLink(e.target.value)}/>
            <Button color="secondary" onPress={() => setNewLink()}>Criar QR Code</Button>
            <Image src={"https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=" + link} />
        </div>
    )
}