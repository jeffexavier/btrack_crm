import { Progress, Card, Grid, Avatar, Text, Button } from "@nextui-org/react";
import Link from "next/link.js";

export default function Layout({children}) {
  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <h2>SenseData</h2>      
      <Button.Group flat color="secondary" css={{p: "0", margin: "0"}}>
        <Button><Link className="text-rebecca-purple" href="/sensedata/clientes">Clientes</Link></Button>
        <Button><Link className="text-rebecca-purple" href="/sensedata/notas_clientes">Notas de clientes</Link></Button>
      </Button.Group>       
      <main className="flex-1">{children}</main>
    </div>
  )
}