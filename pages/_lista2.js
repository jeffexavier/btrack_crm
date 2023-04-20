import axios from "axios"
import { useEffect, useState } from "react"
import { parse } from "node-html-parser"
import notas from "../public/notas.json"
import { Button, useTheme, Avatar, Table } from "@nextui-org/react"

export default function lista() {
  const customersNotes= [
        {
          customer: {
            cnpj: "40.821.857/0001-97",
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
            id: "37134"
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
            id: "37134"
          },
          created_on: "2023-04-16T00:00:00.000Z",
          created_by: {
            email: "jeffin22k@hotmail.com"
          },
          description: "Este é um teste do jeff para conseguir desenvolver a tela de notas do sensedata"
        }
      ]

  const [customers, setCustomers] = useState(customersNotes)
  const { theme } = useTheme();

  // useEffect(()=> {
  //   axios.get("./api/sensedata/notas",{
  //     })
  //     .then(response => {
  //       console.log(response.data.customers_notes)
  //       setCustomers(response.data.customers_notes)
  //   })
  //     .catch(error => {
  //       setCustomers([{name_contract: "Deu errado"}])
  //     })
  // }, [])


  return(
    <>
    <Avatar />
    <Button>teste</Button>
    <Table 
      bordered
      shadow={false}
      color="secondary"
      aria-label="Example pagination  table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="multiple">
    <Table.Header>
        <Table.Column>Data da nota</Table.Column>
        <Table.Column>CNPJ</Table.Column>
        <Table.Column>Empresa</Table.Column>
        <Table.Column>CS</Table.Column>
        <Table.Column>Nota</Table.Column>
    </Table.Header>
    <Table.Body>
      {customers.map((item, index) => (
        <Table.Row key={index}> 
          <Table.Cell> {
            new Date(item.created_on).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            })
          }
          </Table.Cell>
          <Table.Cell>{item.customer.cnpj}</Table.Cell>
          <Table.Cell><a href={"https://biud.sensedata.io/cliente/" + item.customer.id} target="_blank">{item.customer.name_contract}</a></Table.Cell>
          <Table.Cell>{item.created_by.email}</Table.Cell>
          <Table.Cell  css={{
        height: "auto",
        maxWidth: "500px",
      }}>{parse(item.description).text}</Table.Cell>
        </Table.Row>
      ))}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={1}
        onPageChange={(page) => console.log({ page })}
      />
      </Table>
      </>
    )
}