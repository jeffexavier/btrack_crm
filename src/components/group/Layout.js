
import AddGroupButton from "../buttons/AddGroupButton.js";
import UploadListButton from "../buttons/UploadListButton.js";
import FilterGroup from "./FilterGroup.js";
import DownloadListButton from "../buttons/DowloadListButton.js"
import { createGroup } from "@/src/backend/utils/group.js";

export default function Layout({children, getGroups, setGroups, groups}) {

  const groupModel = {
      id_legacy: null,
      name_contract: null,
      name: null,
      contract_cnpj: null,
      status: null,
      cs: null,
      csm: null,
      partner: null,
      dt_register: {type:"date"},
      dt_insert: {type:"date"},
      dt_update: {type:"date"},
      segment: null,
      city: null,
      state: null,
      country: null,
      address: null,
      address_number: null,
      stage: null,
      dt_stage: {type:"date"},
      size: null,
      plan: null,
      dt_cancel: {type:"date"},
      cancel_tag: null,
      cancel_factor: null,
      cancel_description: null
  }


  return (
    <div className="flex flex-col p-5 gap-4 justify-between">
      {/* <h2>Grupos</h2>       */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <AddGroupButton getGroups={getGroups} />
          <FilterGroup setGroups={setGroups}/>
        </div>
        <div className="flex gap-4">
          <DownloadListButton listForDownload={groups} nameForDownload={"lista de empresas"} areaForDownload={"empresas"}/>
          {/* <UploadGroupButton getGroups={getGroups}/> */}
          <UploadListButton getList={getGroups} list={groupModel} createFunction={createGroup}/>
        </div>
      </div> 
      <main className="flex-1">{children}</main>
    </div>
  )
}