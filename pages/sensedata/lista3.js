'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { parse } from "node-html-parser"
import { Table, Modal, Text } from "@nextui-org/react";
import { setCookie, parseCookies } from "nookies";


export default function lista(props) {

  // const customersNotes= [
  //       {
  //         customer: {
  //           cnpj: "40.821.857/0001-97",
  //           name_contract: "1 - Bar do jeffin",
  //           id: "37134"
  //         },
  //         created_on: "2023-04-16T00:00:00.000Z",
  //         created_by: {
  //           email: "jeffin22k@hotmail.com"
  //         },
  //         description: "Lorem ipsum lacinia vestibulum mi aliquam cursus adipiscing ligula, luctus habitasse tincidunt neque enim vulputate arcu, taciti neque quisque est orci mauris leo. dictumst interdum mattis vulputate ac commodo curabitur quam hendrerit praesent vel elementum, aliquet libero tincidunt litora adipiscing venenatis dolor tincidunt suspendisse a, nisi eros elit dictumst taciti nisi nam luctus morbi hac. senectus imperdiet porttitor ante ipsum donec quisque lectus, pretium praesent non integer vel maecenas, nec sociosqu leo blandit erat accumsan. felis sodales velit dui rhoncus ut eleifend rutrum donec, nam dapibus feugiat tincidunt lacus nec suscipit molestie dictum, vulputate at semper nisl netus class taciti. "
  //       },
  //       {
  //         customer: {
  //           cnpj: "40.821.857/0001-97",
  //           name_contract: "2 - Boteco do jeffin",
  //           id: "25045"
  //         },
  //         created_on: "2023-04-16T00:00:00.000Z",
  //         created_by: {
  //           email: "jeffin22k@hotmail.com"
  //         },
  //         description: "Este é um teste do jeff para conseguir desenvolver a tela de notas do sensedata"
  //       },
  //       {
  //         customer: {
  //           cnpj: "40.821.857/0001-97",
  //           name_contract: "3 - Bar do jeffin",
  //           id: "19975"
  //         },
  //         created_on: "2023-04-16T00:00:00.000Z",
  //         created_by: {
  //           email: "jeffin22k@hotmail.com"
  //         },
  //         description: "Este é um teste do jeff para conseguir desenvolver a tela de notas do sensedata"
  //       }
  //     ]


  //     setCookie(null, "customers_notes", JSON.stringify(customersNotes), {
  //       maxAge: 60 * 60 *1, // 1 hour
  //       path: '/'
  //     });

  const [customers, setCustomers] = useState([])
  // const [customers, setCustomers] = useState([])    
  
  // const [customersTeste, setCustomersTeste] = useState(JSON.parse(props.customers_notes || customersNotes))
  
  const [customerNota, setCustomerNota] = useState({customer: "Boteco do jeffin", description: "testasdfasdfasdfasdfasdf", date: "2023-04-24"})
  const [visible, setVisible] = useState(false)

  console.log(customers)

  useEffect(()=> {    
    
    axios.get("/api/sensedata/notas")
      .then((response) => {        
        const newCustomersNotes = JSON.stringify(response.data)
        localStorage.setItem("customers_notes", newCustomersNotes)

        // setCookie(null, "customers_notes", newCustomersNotes, {
        //   maxAge: 60, // 30 seconds
        //   path: '/'
        // });

        console.log(newCustomersNotes)
    })
      .catch(error => {
        console.log(error)
      })

      const newCustomersNotes = localStorage.getItem("customers_notes")

      if(localStorage.getItem("customers_notes")) {
        setCustomers(JSON.parse(newCustomersNotes))
      }
  }, [])

  return(
    <div className="p-5">
      {customers.map((item, index) => (
        <p key={index}>{item.customer.name_contract}</p>
      ))}
    </div>
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