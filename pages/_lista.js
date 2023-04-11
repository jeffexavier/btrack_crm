

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
    <table className="table-auto">
    <thead>
      <tr>
        <th className="border border-slate-600">Data da nota</th>
        <th className="border border-slate-600">CNPJ</th>
        <th className="border border-slate-600">Empresa</th>
        <th className="border border-slate-600">CS</th>
        <th className="border border-slate-600">nota</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((item, index) => (
        <tr key={index}>
          <td className="border border-slate-700"> {
            new Date(item.created_on).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            })
          }
  </td>
          <td className="border border-slate-700">{item.customer.cnpj}</td>
          <td className="border border-slate-700">{item.customer.name_contract}</td>
          <td className="border border-slate-700">{item.created_by.email}</td>
          <td className="border border-slate-700">{parse(item.description).text}</td>
        </tr>
      ))}
      </tbody>
      </table>
    )
}