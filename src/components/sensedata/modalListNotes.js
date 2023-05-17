import { Modal, useModal, Button, Text, Input, Textarea, Table, Header } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import { QueueListIcon, ArrowPathIcon } from "@/public/icons.js";
import ModalCreateCustomerNote from "./modalCreateCustomerNote";
import parse from "node-html-parser";

export default function ModalListNotes({customerObject, userData}) {

  const [customersNotes, setCustomersNotes] = useState([])
  const [customerNotes, setCustomerNotes] = useState([])
  const [ visible, setVisible ] = useState();

  async function getCustomersNotes() {
    await axios.get("/api/sensedata/notas")
      .then((response) => {
        const customersNotes = response.data.customers_notes
        const customersNotesReverse = customersNotes.reverse()
        const newCustomersNotes = JSON.stringify(customersNotesReverse)

        localStorage.setItem("customers_notes", newCustomersNotes)
        setCustomersNotes(customersNotesReverse);
    })
      .catch(error => {
        console.log(error.response)
        if(localStorage.getItem('customers_notes')) {
          setCustomersNotes(JSON.parse(localStorage.getItem('customers_notes')))
        } else {
          setCustomersNotes(customersNotesPreview)
        }        
      })
  }

  async function getCustomerNotes() {
    const filteredCustomersNotes = customersNotes.filter(item => item.customer.id === customerObject.id)
    setCustomerNotes(filteredCustomersNotes)
  }

  async function attCustomerNotes() {
    await getCustomersNotes();
    await getCustomerNotes();
    console.log("atualizar")
  }


  useEffect(()=> {  
    if(localStorage.getItem('customers_notes')) {
      setCustomersNotes(JSON.parse(localStorage.getItem('customers_notes')))
      console.log("atualizou")
    } else {
      getCustomersNotes()
    }
  }, [visible, customerNotes])

  return (
    <div>
      <QueueListIcon onClick={getCustomerNotes} height="24px"  className="absolute top-4 right-4 cursor-pointer bg-white roudend-md"/>
      <Modal
        scroll
          //blur
          shadow
          closeButton
          width="100%"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={visible}
          css={{
            cursor: "default"
          }}
          onClose={() => setVisible(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18} weight="semibold">
            Notas de {customerObject.name_contract}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-between">
          <ModalCreateCustomerNote customerId={customerObject.id} userData={userData}/>
          <Button bordered auto color="secondary" onPress={() => {attCustomerNotes()}}>
            <ArrowPathIcon height="24px"/>
          </Button>
          </div>
          <ul className="divide-y-2">
          {customerNotes.map((item, index) => (
            <li key={index} className="">
            <p>{new Date(item.created_on).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>{parse(item.description).text}</p>
            </li>
          ))}
        </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}
