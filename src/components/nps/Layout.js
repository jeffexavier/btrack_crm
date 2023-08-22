import { PlusIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";

import AddNpsButton from "./AddNpsButton.js";
import DownloadListButton from "../buttons/DowloadListButton.js"
import { useEffect, useState } from "react";

export default function Layout({children, getNpsList, listNps}) {
  
  const newListNps = listNps.map((item, index) => {
    return { ...item, contact: item.contact ? item.contact.name : '', group: item.group.name || '' }
  }
  )

  // useEffect(() => {
  //   getListNps()  \
  // }, [])


  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <div className="flex justify-between">
      <AddNpsButton getNpsList={getNpsList}/>
      <DownloadListButton  listForDownload={newListNps} nameForDownload={"lista_nps"} areaForDownload={"nps"}/>
        </div>    
      <main className="flex-1">{children}</main>
    </div>
  )
}