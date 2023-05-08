import { Button, Input, Image, Card, Text, Modal, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DocumentDuplicateIcon } from "@/public/icons/DocumentDuplicateIcon.js";

export default function Index() {

    const [visible, setVisible] = useState(false)
    const [inputLink, setInputLink] = useState('')
    const [link, setLink] = useState('')
    const [linkList, setLinkList] = useState([])

    function setNewInputLink() {
        setLink(inputLink)
        console.log(inputLink)
    }

    function setNewLink() {
        const newLinkList = {link: inputLink, qrcode:"https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=" + inputLink, date: new Date() }    
        
        linkList.push(newLinkList)

        localStorage.setItem('linkList', JSON.stringify(linkList))

        if(localStorage.getItem('linkList')) {
            setLinkList(JSON.parse(localStorage.getItem('linkList')))
        }

        setVisible(false)
    }

    function deleteLink(itemIndex) {
        linkList.splice(itemIndex, 1);
        localStorage.setItem('linkList', JSON.stringify(linkList))
        setLinkList(JSON.parse(localStorage.getItem('linkList')))
    }

    async function downloadImage(url, name) {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobURL = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = name.replace(/[./]/g, '_') + "_QR_CODE_" + new Date().toLocaleDateString('pt-BR') + ".png";
        link.click();
      }
    
      async function copyImage(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobArray = [new ClipboardItem({ 'image/png': blob })];

        navigator.clipboard.write(blobArray).then(() => {
          console.log("Imagem QR Code copiada!");
        })
      }

    useEffect(() => {
        if(localStorage.getItem('linkList')) {
            setLinkList(JSON.parse(localStorage.getItem('linkList')))
        }
    }, [])

    return (
        <div className="flex flex-col gap-3 p-5">
            <Button color="secondary" onPress={() => {setLink('');setVisible(true)}} css={{maxWidth:'80px' }}>Criar novo QRCode </Button>
            <div className="grid grid-cols-1 gap-2 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
            {linkList.map((item, index) => (
                <Card borderWeight="" key={index} css={{minWidth:'fit-content'}}>
                <Card.Header css={{textAlign: 'center', justifyContent: 'space-between', paddingLeft:'25px'}}>
                    <Text weight="medium">{
                        new Date(item.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })
                    }
                    </Text>
                </Card.Header>
                    <Card.Body css={{textAlign: 'center', justifyContent: 'center', alignItems:'center', paddingRight: "25px"}}>
                        <Image src={"https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" + item.link}></Image>  
                        <Link color="secondary" href={''} css={{textAlign: 'center'}}>{item.link}</Link>                    
                    </Card.Body>
                    <Card.Footer css={{justifyContent:'center', minWidth: 'auto'}}>
                    <Button.Group flat color="secondary">
                        <Button id="copyButton" color="secondary" css={{width: '100%'}} onPress={() => {copyImage(item.qrcode)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                        </Button>
                        <Button id="downloadButton" color="secondary" css={{width: '100%'}} onPress={() => {downloadImage(item.qrcode, item.link)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                            </svg>
                        </Button>                        
                        </Button.Group>
                        <Button.Group flat color="error">
                        <Button id="deleteButton" color="error" css={{width: '100%'}} onPress={() => {deleteLink(index)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </Button>
                        </Button.Group>
                    </Card.Footer>
                </Card>
            ))}
            </div>
            <Modal
            open={visible}
            closeButton
            onClose={() => setVisible(false)}
            css={{gap: '0px', paddingBottom: '10px'}}
            >
                <Modal.Header css={{}}>
                <Input animated required type="url" css={{width: '100%'}} id="input-link" placeholder="Link do site aqui" onChange={(e) => setInputLink(e.target.value)}/>
                </Modal.Header>
                <Modal.Body>
                {link ? (
                    <>
                    <Image src={"https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=" + link || ''}></Image>
                    <Button color="success" onPress={() => setNewLink()}>Salvar QR Code</Button>
                    </>
                    ) : <Button color="secondary" onPress={() => setNewInputLink()}>Criar QR Code</Button>}
                </Modal.Body>
            </Modal>
        </div>
    )
}