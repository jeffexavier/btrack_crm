
import { createRevenue } from "@/src/backend/utils/revenue.js"

import RevenueModal from "./RevenueModal.js";

import UploadListButton from "../buttons/UploadListButton.js";
import DownloadListButton from "../buttons/DowloadListButton.js"

export default function Layout({children, getRevenues, listedRevenues}) {

  const newListedRevenues = listedRevenues.map(item => {
    return {...item, group: item.group.name, request_reason: item.request_reason ? item.request_reason.value : null}
  })

  const revenueList = {
    group: null,
    id_legacy: null,
    request_status: null,
    request_type: null,
    last_plan: null,
    plan: null,
    dt_request: {type:"date"},
    request_value: null,
    license_qty: null,
    request_reason: null,
    request_factor:null,
    request_description:null  
  }

  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <div className="flex justify-between">
        <RevenueModal getRevenues={getRevenues} />
        <div className="flex justify-end gap-4">
          <DownloadListButton listForDownload={newListedRevenues} nameForDownload={"lista_registros_mrr"} areaForDownload={"registros"}/>
          <UploadListButton getList={getRevenues} list={revenueList} createFunction={createRevenue} />
        </div>
      </div> 
      <main className="flex-1">{children}</main>
    </div>
  )
}