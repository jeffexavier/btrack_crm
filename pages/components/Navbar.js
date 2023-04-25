import { Avatar, Button } from "@nextui-org/react";

export default function NavBar() {
  return (
    <nav className="flex justify-end items-center px-4 py-4 shadow-sm">
      <div className="flex">
        <a className="p-2 text-rebecca-purple font-medium">Ajuda</a>
        <Button color="secondary" ripple animated className="mx-2">Logout</Button>
      </div>
    </nav>
  )
}