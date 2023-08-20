
import AddGroupButton from "../buttons/AddGroupButton.js";
import UploadGroupButton from "./UploadGroupButton.js";
import FilterGroup from "./FilterGroup.js";

export default function Layout({children, getGroups, setGroups}) {
  return (
    <div className="flex flex-col p-5 gap-4 justify-between">
      {/* <h2>Grupos</h2>       */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <AddGroupButton getGroups={getGroups} />
          <FilterGroup setGroups={setGroups}/>
        </div>
        <UploadGroupButton getGroups={getGroups}/>
      </div> 
    
      <main className="flex-1">{children}</main>
    </div>
  )
}