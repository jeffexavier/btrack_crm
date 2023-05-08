import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link.js";

export default function NavBar() {
  return (
    <nav className="flex justify-end items-center px-4 py-4 shadow-sm">
      <div className="flex">
        <Link href="/" className="p-2 text-rebecca-purple font-medium">Ajuda</Link>
        <Button color="secondary" className="mx-2">Logout</Button>
      </div>
    </nav>
  )
}