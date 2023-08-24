
import AddGroupButton from "../buttons/AddGroupButton.js";
import UploadGroupButton from "./UploadGroupButton.js";
import UploadGroupButtonTest from "./UploadGroupButtonTest.js";
import FilterGroup from "./FilterGroup.js";
import DownloadListButton from "../buttons/DowloadListButton.js"

export default function Layout({children, getGroups, setGroups, groups}) {
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
          <UploadGroupButtonTest getList={getGroups}/>
        </div>
      </div> 
      <main className="flex-1">{children}</main>
    </div>
  )
}