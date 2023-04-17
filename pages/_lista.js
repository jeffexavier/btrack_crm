import axios from "axios"
import { useEffect, useState } from "react"
import { parse } from "node-html-parser"

export default function lista() {

  const [customers, setCustomers] = useState([])

  useEffect(()=> {
    axios.get("./api/sensedata/notas",{
      })
      .then(response => {
        console.log(response.data.customers_notes)
        setCustomers(response.data.customers_notes)
    })
      .catch(error => {
        setCustomers([{name_contract: "Deu errado"}])
      })
  }, [])


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