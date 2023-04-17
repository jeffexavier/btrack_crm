import axios from "axios"
import { useEffect, useState } from "react"
import { parse } from "node-html-parser"
import notas from "../public/notas.json"

export default function lista() {
  const notasJson= {
      customers_notes: [
        {
          customer: {
            cnpj: "40.821.857/0001-97",
            name_contract: "1 - Boteco do jeffin",
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
        }
      ]
    }

  const [customers, setCustomers] = useState(notasJson.customers_notes)

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
    <table className="table-auto ">
    <thead className=" bg-russian-violet text-white h-[50px]">
      <tr className="border-b text-left">
        <th className="px-2 min-w-[150px]">Data da nota</th>
        <th className="px-2 min-w-[180px]">CNPJ</th>
        <th className="px-2 min-w-[180px]">Empresa</th>
        <th className="px-2 min-w-[210px]">CS</th>
        <th className="px-2">Nota</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((item, index) => (
        <tr key={index} className="bg-tropical-indigo text-lavender transition duration-300 ease-in-out hover:bg-slate-blue hover:text-white py-2"> 
          <td className="border-b px-2 font-bold"> {
            new Date(item.created_on).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            })
          }
          </td>
          <td className="border-b p-2">{item.customer.cnpj}</td>
          <td className="border-b p-2 hover:font-bold"><a href={"https://biud.sensedata.io/cliente/" + item.customer.id} target="_blank">{item.customer.name_contract}</a></td>
          <td className="border-b p-2">{item.created_by.email}</td>
          <td className="border-b p-2 text-justify hover:font-bold">{parse(item.description).text}</td>
        </tr>
      ))}
      </tbody>
      </table>
    )
}