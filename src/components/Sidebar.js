import Image from "next/image.js";
import Link from "next/link.js";

import { Button, Navbar } from "@nextui-org/react";
import { BuildingOffice2Icon, BanknotesIcon, ChatBubbleOvalLeftEllipsisIcon, QrCodeIcon, HomeIcon } from "@/public/icons.js";

const pages = [
  {
    page: "HOME",
    link: "/internal/dashboard",
    icon: () => <HomeIcon stroke="#7828C7" width="18px"/>
  },
  {
    page: "EMPRESAS",
    link: "/internal/group",
    icon: () => <BuildingOffice2Icon stroke="#7828C7" width="18px"/>
  },
  {
    page: "FINANCEIRO",
    link: "/internal/revenue",
    icon: () => <BanknotesIcon stroke="#7828C7" width="18px"/>
  },
  {
    page: "CONTADOR SMS",
    link: "/internal/sendersms",
    icon: () => <ChatBubbleOvalLeftEllipsisIcon stroke="#7828C7" width="18px"/>
  },
  {
    page: "QRCODE",
    link: "/internal/qrcode",
    icon: () => <QrCodeIcon stroke="#7828C7" width="18px"/>
    
  }
]

export default function SideBar() {
  return (
    <>
    <nav className="flex flex-col justify-between shadow-lg min-w-[210px]">
    <div className="flex flex-col justify-start content-start">
      <div>
        <h1 className="text-center">JX</h1>
      </div>
      <div className="flex flex-col gap-2 p-4 w-full">
        {pages.map((item, index) => (
          <Link key={index} href={item.link}>
          <div className="flex justify-start  hover:bg-[#e0cbf5] gap-2 py-2.5 px-4 rounded-xl items-center cursor-pointer transition-colors ease-linear">
            <div>{<item.icon stroke="red"/>}</div>
            <div>
            <p className="text-sm font-medium text-[#7828C7]">{item.page}</p>
            </div>
          </div>

          </Link>
        ))}
        </div>
      </div>
      <p className="text-center sticky pb-5 font-normal text-periwinkle">Versão 0.0.0</p>
    </nav>
    </> 
  )
}