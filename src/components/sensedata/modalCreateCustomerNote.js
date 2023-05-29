import { Modal, Button, Text, Input, Textarea } from "@nextui-org/react";
// import { parseCookies } from 'nookies'
import { useEffect, useState } from "react";
import postSenseDataCustomerNote from "@/src/backend/utils/postSenseDataCustomerNote.js"
import { ArrowPathIcon } from "@/public/icons";

import axios from "axios";
// import {v4 as uuidv4} from 'uuid'
// import { parse } from "dotenv";

export default function ModalCreateCustomerNote({userData, customerId}) {

  const [ visible, setVisible ] = useState();
  const [ formNota, setFormNota ] = useState({
    idEmpresa: customerId ? customerId : '',
    descriptionNote: ''
  });

  async function getCustomers() {
    await axios.get("/api/sensedata/customers")
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

  function changeForm(e, name) {
    setFormNota({
      ...formNota,
      [name]: e.target.value
    })
  }

  async function postCustomerNote() {
    await postSenseDataCustomerNote(formNota.idEmpresa, userData.name + " | " + formNota.descriptionNote)
    setTextArea('')
    if(customerId) {
      setVisible(false)
    }
  }

  // const [customerNota, setCustomerNota] = useState({})
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
          postCustomerNote(customerId ? customerId : e.target[0].value, e.target[1].value)
          }}>
              {customerId ? <></> : <select onChange={(e) => {changeForm(e, "idEmpresa")}} className="text-eerieblack placeholder:text-white bg-[#f1f1f1] p-2 rounded-lg">
              <option value="" className="text-[#11181c]">Escolha a empresa</option>
            {customers.map((item, index) => (
              <option key={index} className="text-[#11181c]" value={item.id}>{item.name_contract}</option>
            ))}
              </select> }
              <textarea onChange={(e) => {changeForm(e, "descriptionNote")}} placeholder="Descrição da nota" className="text-eerieblack placeholder:text-eerieblack bg-[#f1f1f1] p-2 rounded-lg"></textarea>
              <Button type="submit" color="secondary">Criar nota de cliente</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}