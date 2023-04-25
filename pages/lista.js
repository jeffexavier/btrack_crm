

import axios from "axios"
import { useEffect, useState } from "react"
import { parse } from "node-html-parser"

import { Table, Modal, Text } from "@nextui-org/react";

export default function lista() {

  const [customers, setCustomers] = useState([])
  const [customerNota, setCustomerNota] = useState({customer: "Boteco do jeffin", description: "testasdfasdfasdfasdfasdf", date: "2023-04-24"})
  const [visible, setVisible] = useState(false)

  useEffect(()=> {
    axios.get("/api/sensedata/notas")
      .then(response => {
        console.log(response.data.customers_notes)
        setCustomers(response.data.customers_notes)
    })
      .catch(error => {

        const customersNotes = {customers_notes: [
          {
            customer: {
              id: "--",
              name_contract: "--",
              cnpj: "--"
            },
            created_by: {
              email: "--"
            },
            created_on: "0000-00-00T00:00:00.000000",
            description: "--"
          }

        ]}

        setCustomers(customersNotes.customers_notes)
      })
  }, [])


  return(
    <div className="p-5">
      <Table color="secondary" borderWeight="" aria-label="Example static collection table">
        <Table.Header>
            <Table.Column>Data da nota</Table.Column>
            <Table.Column>Empresa</Table.Column>
            <Table.Column>CS</Table.Column>
            <Table.Column>Nota</Table.Column>
        </Table.Header> 
        <Table.Body>
        {customers.map((item, index) => (
          <Table.Row key={index}> 
            <Table.Cell css={{maxWidth: "150px", minWidth: "150px"}}> {
              new Date(item.created_on).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
              })
            }
            </Table.Cell>
            <Table.Cell css={{maxWidth: "180px", minWidth: "180px"}}><a href={"https://biud.sensedata.io/cliente/" + item.customer.id} target="_blank" className="text-rebecca-purple font-bold">{item.customer.name_contract}</a></Table.Cell>
            <Table.Cell css={{maxWidth: "180px", minWidth: "180px"}}>{item.created_by.email}</Table.Cell>
            <Table.Cell css={{ height: "auto", minWidth: "800px", maxWidth: "800px", cursor:"pointer"}}>
              <button onClick={() => {
                console.log(item.description)
                setCustomerNota({
                  customer: item.customer.name_contract,
                  description: parse(item.description).text,
                  date: new Date(item.created_on).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
              })
                })
                setVisible(true)
              }}>
              {parse(item.description).text}
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
        <Modal
          scroll
          blur
          closeButton
          width="600px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={visible}
          onClose={() => setVisible(false)}
        >
            <Modal.Header >
              <Text size={18}>{customerNota.customer}</Text>
            </Modal.Header>
            <Modal.Body>
              <Text>{customerNota.description}</Text>
            </Modal.Body>
            <Modal.Footer>
              <Text>Criado em: {customerNota.date}</Text>
            </Modal.Footer>
        </Modal>
      </div>
    )
}