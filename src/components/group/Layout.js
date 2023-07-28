import { Progress, Card, Grid, Avatar, Text, Button } from "@nextui-org/react";
import { parseCookies } from "nookies";

import AddGroupButton from "../buttons/AddGroupButton.js";
import Link from "next/link.js";

export default function Layout({children}) {
  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      {/* <h2>Grupos</h2>       */}
      <div>
        <AddGroupButton />
        </div> 
    
      <main className="flex-1">{children}</main>
    </div>
  )
}