import { PlusIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";

import AddNpsButton from "./AddNpsButton.js";
import UploadListButton from "../buttons/UploadListButton.js";
import DownloadListButton from "../buttons/DowloadListButton.js"
import { createNps } from "@/src/backend/utils/nps.js"
import { useEffect, useState } from "react";

export default function Layout({children, getNpsList, listNps}) {
  
  const newListNps = listNps.map((item, index) => {
    return { ...item, contact: item.contact ? item.contact.name : '', group: item.group.name || '' }
  }
  )

  const npsList = {
    id_legacy: null,
    partner: null,
    group: null,
    contact: null,
    ref_date: {type:"date"},
    survey_date: {type:"date"},
    score: null,
    nps_status: null,
    stage: null,
    category: null,
    comment: null,
    tags: null,
    dt_register: {type:"date"},
    dt_update: {type:"date"}
  }

  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <div className="flex justify-between">
      <AddNpsButton getNpsList={getNpsList}/>
        <div className="flex justify-end gap-4">
          <DownloadListButton  listForDownload={newListNps} nameForDownload={"lista_nps"} areaForDownload={"nps"}/>
          <UploadListButton getList={getNpsList} list={npsList} createFunction={createNps} />
        </div>    
        </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}