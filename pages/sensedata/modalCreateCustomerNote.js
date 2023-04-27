import { Modal, useModal, Button, Text, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
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

  const [customers, setCustomers] = useState([])

  useEffect(() => {
    if(localStorage.getItem('customers')) {
      setCustomers(JSON.parse(localStorage.getItem('customers')))
    } else {
      getCustomers()
    }
  }, [])

  return (
    <div>
      <Button auto shadow color="secondary" onPress={() => setVisible(true)}>
        Criar nova nota
      </Button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Criar nota de cliente
          </Text>
        </Modal.Header>
        <Modal.Body>
        <form className="flex flex-col gap-2" onSubmit={(e) => {e.preventDefault(); console.log("inserido")}}>
          <Input list="lista" placeHolder="Nome da empresa"/>
          <datalist id="lista">
            {customers.map((item, index) => (
              <option key={index} value={item.name_contract}/>
            ))}
          </datalist>
          <Textarea type="text" placeHolder="Descrição da nota"/>
          <Input type="submit" value="Criar nota" css={{backgroundColor:"#654893"}}/>
        </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
