import Image from "next/image.js";
import Link from "next/link.js";

import { Button, Navbar } from "@nextui-org/react";

const pages = [
  {
    page: "HOME",
    link: "/"
  },
  {
    page: "SENSEDATA",
    link: "/sensedata/notas_clientes"
  },
  {
    page: "QRCODE",
    link: "/qrcode"
  },
  {
    page: "MÚSICAS",
    link: "/musica"
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
          <a key={index} href={item.link}><Button shadow color="secondary" className="my-1 mx-2">{item.page}</Button></a>
        ))}
      </div>
      <p className="text-center sticky pb-5 font-normal text-periwinkle">Versão 0.0.0</p>
    </nav>
    </> 
  )
}