import { PlusIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";

import AddContactButton from "./AddContactButton.js";
import UploadListButton from "../buttons/UploadListButton.js";
import DownloadListButton from "../buttons/DowloadListButton.js"
import { createContact } from "@/src/backend/utils/contact.js";
import { useEffect, useState } from "react";

export default function Layout({children, getContactsList, listContacts}) {
  
  const newListContacts = listContacts
  const contactList = {
    id_legacy: {type: String},
    groups: [{type: 'ObjectId', ref: 'Group', required: true}],
    partners: [{type: 'ObjectId', ref: 'Group'}],
    name: {type: String, required: true},
    occupation: {type: String},
    phone: [{
      value: {type: String, required: true},
      primary: {type: Boolean, default: false},
      label: {type: String, default: 'Outro'}
    }],
    email: [{
      value: {type: String, required: true},
      primary: {type: Boolean, default: false},
      label: {type: String, default: 'Outro'}
    }],
    dt_register: {type: Date, default: Date.now},
    dt_update: {type: Date}
  }

  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <div className="flex justify-between">
      <AddContactButton getContactsList={getContactsList}/>
        <div className="flex justify-end gap-4">
          <DownloadListButton  listForDownload={newListContacts} nameForDownload={"lista_nps"} areaForDownload={"nps"}/>
          <UploadListButton getList={getContactsList} list={contactList} createFunction={createContact} />
        </div>    
        </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}