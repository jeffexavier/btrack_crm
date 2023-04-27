'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { parse } from "node-html-parser"
import { Table, Modal, Text } from "@nextui-org/react";
import { setCookie, parseCookies } from "nookies";
import Layout from "./Layout.js";
import ModalCreateCustomerNote from './modalCreateCustomerNote.js'


export default function lista() {

  async function getCustomersNotes() {
    await axios.get("/api/sensedata/notas")
      .then((response) => {
        const customersNotes = response.data.customers_notes
        const customersNotesReverse = customersNotes.reverse()
        const newCustomersNotes = JSON.stringify(customersNotesReverse)

        localStorage.setItem("customers_notes", newCustomersNotes)

        console.log(newCustomersNotes)
    })
      .catch(error => {
        console.log(error.response)
        setCustomers(customersNotes)
      })
  }

  const customersNotes= [
        {
          customer: {
            cnpj: new Date(),
            name_contract: "1 - Bar do jeffin",
            id: "37134"
          },
          created_on: "2023-04-16T00:00:00.000Z",
          created_by: {
            email: "jeffin22k@hotmail.com"
          },
          description: "Lorem ipsum lacinia vestibulum mi aliquam cursus adipiscing ligula, luctus habitasse tincidunt neque enim vulputate arcu, taciti neque quisque est orci mauris leo. dictumst interdum mattis vulputate ac commodo curabitur quam hendrerit praesent vel elementum, aliquet libero tincidunt litora adipiscing venenatis dolor tincidunt suspendisse a, nisi eros elit dictumst taciti nisi nam luctus morbi hac. senectus imperdiet porttitor ante ipsum donec quisque lectus, pretium praesent non integer vel maecenas, nec sociosqu leo blandit erat accumsan. felis sodales velit dui rhoncus ut eleifend rutrum donec, nam dapibus feugiat tincidunt lacus nec suscipit molestie dictum, vulputate at semper nisl netus class taciti. "
        },
        {
          customer: {
            cnpj: "40.821.857/0001-97",
            name_contract: "2 - Boteco do jeffin",
            id: "25045"
          },
          created_on: "2023-04-16T00:00:00.000Z",
          created_by: {
            email: "jeffin22k@hotmail.com"
          },
          description: "Este é um teste do jeff para conseguir desenvolver a tela de notas do sensedata"
        },
        {
          customer: {
            cnpj: "40.821.857/0001-97",
            name_contract: "3 - Bar do jeffin",
            id: "19975"
          },
          created_on: "2023-04-16T00:00:00.000Z",
          created_by: {
            email: "jeffin22k@hotmail.com"
          },
          description: "Este é um teste do jeff para conseguir desenvolver a tela de notas do sensedata"
        }
      ]

  const [customers, setCustomers] = useState([])

  const [customerNota, setCustomerNota] = useState({customer: "Boteco do jeffin", description: "testasdfasdfasdfasdfasdf", date: "2023-04-24"})
  const [visible, setVisible] = useState(false)

  useEffect(()=> {  
    if(localStorage.getItem('customers_notes')) {
      setCustomers(JSON.parse(localStorage.getItem('customers_notes')))
    } else {
      getCustomersNotes()
    }
  }, [])

  return(
    <Layout>
    <ModalCreateCustomerNote />
      <Table color="secondary" borderWeight="" aria-label="Example static collection table" css={{minWidth: "100%", maxWidth: "100%"}}>
        <Table.Header >
            <Table.Column css={{maxWidth: "min-content"}}>Data da nota</Table.Column>
            <Table.Column >Empresa</Table.Column>
            <Table.Column >CS</Table.Column>
            <Table.Column >Nota</Table.Column>
        </Table.Header> 
        <Table.Body>
        {customers.map((item, index) => (
          <Table.Row key={index}> 
            <Table.Cell css={{minWidth: "min-content", maxWidth: "min-content"}}> {
              new Date(item.created_on).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
              })
            }
            </Table.Cell>
            <Table.Cell css={{minWidth: "auto", maxWidth: "160px"}}><a href={"https://biud.sensedata.io/cliente/" + item.customer.id} target="_blank" className="text-rebecca-purple font-bold">{item.customer.name_contract}</a></Table.Cell>
            <Table.Cell css={{minWidth: "auto", maxWidth: "160px"}}>{item.created_by.name}</Table.Cell>
            <Table.Cell css={{minWidth: "auto", maxWidth: "500px"}} className="hover:font-bold">
            <div className="cursor-pointer hover:font-bold max-w-[500px] flex text-rebecca-purple" onClick={() => {
                console.log(item.description)
                setCustomerNota({
                  customer: item.customer.name_contract,
                  customer_id: item.customer.id,
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
              </div>
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
          // blur
          closeButton
          width="600px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={visible}
          css={{
            cursor: "default"
          }}
          onClose={() => setVisible(false)}
        >
          <Modal.Header justify="flex-start" css={{alignItems: "center"}}>            
            <Text as="a" href={"https://biud.sensedata.io/cliente/" + customerNota.customer_id} color="#5941a9" target="_blank" css={{cursor:"pointer", display:"flex", alignItems:"center"}} size={18} weight={"bold"}>
            {customerNota.customer}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Text>                
          </Modal.Header>
          <Modal.Body>
            <Text>{customerNota.description}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Text weight={"medium"}>{customerNota.date}</Text>
          </Modal.Footer>
        </Modal>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const cookies = parseCookies(context);

  return {
    props: {
      msg: "[teste] esté é um teste",
      // customers_notes: cookies.customers_notes2
    }
  }

}