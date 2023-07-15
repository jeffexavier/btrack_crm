
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function Tasks() {
  
  const [tasks, setTasks] = useState([])

  async function getTasks() {
    const newTasks = await fetch('/api/sensedata/tasks?limit=1000&page=1&group=Entrada do cliente').then(response => {
      return response.json()      
    })
    console.log(newTasks)
    setTasks(newTasks.tasks)
  }
  
  useEffect(() => {
    getTasks()
  }, [])
  
  return (
    <>
    <div className="grid grid-cols-4">
      {tasks.map((item, index) => (
        <div key={index} className="bg-[#f1f1f1] p-3 m-2 rounded-lg shadow-sm hover:shadow-md transition-all">
          <h3>{item.customer.name_contract}</h3>
          <p><b>Tarefa:</b> {item.description}</p>
          <p><b>Grupo:</b> {item.group}</p>
          <p><b>{item.end_date !== null ? new Date(item.end_date).toLocaleString('pt-BR', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }) : "--" }</b></p>
        </div>
      ))}
      </div>
      <Button>Página anterior</Button>
      <Button>Próxima página</Button>
    </>
  )
}