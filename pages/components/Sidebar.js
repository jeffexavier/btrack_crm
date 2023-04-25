import Image from "next/image.js";
import Link from "next/link.js";

import { Button, Navbar } from "@nextui-org/react";

const pages = [
  {
    page: "HOME",
    link: "/"
  },
  {
    page: "SOBRE",
    link: "/sobre"
  },
  {
    page: "SENSEDATA",
    link: "/lista2"
  }
]

export default function SideBar() {
  return (
    <>
    <nav className="flex flex-col justify-between shadow-lg min-w-[210px]">
      <div>
        <h1 className="text-center">JX</h1>
      </div>
      <div className="flex-1 flex flex-col">
        {pages.map((item, index) => (
          <a key={index} href={item.link}><Button bordered ghost color="secondary"  className="my-1 mx-2">{item.page}</Button></a>
        ))}
      </div>
      <p className="text-center sticky pb-5 font-normal text-periwinkle">Versão 0.0.0</p>
    </nav>
    {/* <Navbar css={{ backgroundColor: "$blue600" }}>
      <Navbar.Content css={{ backgroundColor: "$blue600" , padding: 0 , margin: 0}}>
        <Navbar.Link href="/">HOME</Navbar.Link>
        <Navbar.Link href="/sobre">SOBRE</Navbar.Link>
        <Navbar.Link href="/lista">SENSEDATA</Navbar.Link>
      </Navbar.Content>
    </Navbar> */}
    </> 
  )
}