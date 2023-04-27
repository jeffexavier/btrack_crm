import { Progress, Card, Grid, Avatar, Text, Button } from "@nextui-org/react";


export default function Layout({children}) {
  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <h2>SenseData</h2>      
      <Button.Group flat color="secondary" css={{p: "0", margin: "0"}}>
        <Button as="a" href="/sensedata/clientes">Clientes</Button>
        <Button as="a" href="/sensedata/notas_clientes">Notas de clientes</Button>
      </Button.Group>       
      <main className="flex-1">{children}</main>
    </div>
  )
}