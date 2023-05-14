import { Modal, Button, Text, Input, Textarea } from "@nextui-org/react";
// import { parseCookies } from 'nookies'
import { useEffect, useState } from "react";
import postSenseDataCustomerNote from "@/src/backend/utils/postSenseDataCustomerNote"

import axios from "axios";
// import {v4 as uuidv4} from 'uuid'
// import { parse } from "dotenv";

export default function ModalCreateCustomerNote({userData}) {
  const [ visible, setVisible ] = useState();

  async function getCustomers() {
    await axios.get("/api/sensedata/clientes")
      .then((response) => {
        const customers = response.data.customers
        const customersReverse = customers.reverse()
        const newCustomers = JSON.stringify(customersReverse)

        localStorage.setItem("customers", newCustomers)
        setCustomers(customersReverse)
        console.log(newCustomers)
    })
      .catch(error => {
        console.log(error.response)
      })
  }

  async function postCustomerNote(customer_id, noteDescription) {
    await postSenseDataCustomerNote(customer_id, userData.name + " | " + noteDescription)
    setTextArea('')
    // setVisible(false)
  }

  const [customerNota, setCustomerNota] = useState({})
  const [customers, setCustomers] = useState([])
  const [textArea, setTextArea] = useState('')

  useEffect(() => {
    if(localStorage.getItem('customers')) {
      setCustomers(JSON.parse(localStorage.getItem('customers')))
    } else {
      getCustomers()
    }
  }, [])

  return (
    <div>
      <Button color="secondary" onPress={() => setVisible(true)}>
        Criar nova nota
      </Button>
      <Modal
        scroll
          // blur
          closeButton
          width="600px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={visible}
          css={{
            cursor: "default"
          }}
          onClose={() => setVisible(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18} weight="semibold">
            Criar nota de cliente
          </Text>
        </Modal.Header>
        <Modal.Body>
        <form className="flex flex-col gap-2" onSubmit={(e) => {
          e.preventDefault();
          postCustomerNote(e.target[0].value, e.target[1].value)
          }}>
          <Input as="select" css={{color:"red", placeHolder:"red"}} className="text-rose placeholder:text-rose">
          <option value="" className="text-[#11181c]">Escolha a empresa</option>
            {customers.map((item, index) => (
              <option key={index} className="text-[#11181c]" value={item.id}>{item.name_contract}</option>
            ))}
            </Input>        
          <Textarea type="text" placeHolder="Descrição da nota" onChange={(e) => {setTextArea(e.target.value)}} value={textArea}/>
          <Input cursor="pointer" type="submit" value="Criar nota" css={{backgroundColor:"#654893"}}/>
        </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}