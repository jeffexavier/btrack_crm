import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";

import { Button, Input, Image, Card, Text, Modal, Link } from "@nextui-org/react";
import { ArrowDownOnSquareIcon, DocumentDuplicateIcon, TrashIcon } from "@/public/icons.js";
import { useEffect, useState } from "react";
import InternalLayout from '@/src/components/InternalLayout';

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
        <InternalLayout>
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
                                <DocumentDuplicateIcon height="20px"/>
                            </Button>
                            <Button id="downloadButton" color="secondary" css={{width: '100%'}} onPress={() => {downloadImage(item.qrcode, item.link)}}>
                                <ArrowDownOnSquareIcon height="20px"/>
                            </Button>                        
                            </Button.Group>
                            <Button.Group flat color="error">
                            <Button id="deleteButton" color="error" css={{width: '100%'}} onPress={() => {deleteLink(index)}}>
                                <TrashIcon height="20px"/>
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
        </InternalLayout>
    )
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context)
    const token = cookies.authorization
    try {
      verifyToken(token)
      return {
        props: {}
      }
    } catch (err) {     
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        },
        props: {}
      }
    }
  }