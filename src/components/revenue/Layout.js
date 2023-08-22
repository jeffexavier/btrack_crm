
import RevenueModal from "./RevenueModal.js";
import DownloadListButton from "../buttons/DowloadListButton.js"

export default function Layout({children, getRevenues, listedRevenues}) {

  const newListedRevenues = listedRevenues.map(item => {
    return {...item, group: item.group.name, request_reason: item.request_reason ? item.request_reason.value : null}
  })


  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <div className="flex justify-between">
        <RevenueModal getRevenues={getRevenues} />
        <DownloadListButton listForDownload={newListedRevenues} nameForDownload={"lista_registros_mrr"} areaForDownload={"registros"}/>
      </div> 
      <main className="flex-1">{children}</main>
    </div>
  )
}