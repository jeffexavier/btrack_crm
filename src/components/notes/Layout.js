import { PlusIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";

import AddNpsButton from "./AddNpsButton.js";
import UploadListButton from "../buttons/UploadListButton.js";
import DownloadListButton from "../buttons/DowloadListButton.js"
import { createNps } from "@/src/backend/utils/nps.js"
import { useEffect, useState } from "react";

export default function Layout({children, getNotesList, listNotes}) {
  
  const newListNotes = listNotes.map((item, index) => {
    return { ...item, contact: item.contact ? item.contact.name : '', group: item.group.name || '' }
  }
  )

  const notesList = {
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
      <AddNpsButton getNpsList={getNotesList}/>
        <div className="flex justify-end gap-4">
          <DownloadListButton  listForDownload={newListNotes} nameForDownload={"lista_notas"} areaForDownload={"notas"}/>
          <UploadListButton getList={getNotesList} list={notesList} createFunction={createNps} />
        </div>    
        </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}