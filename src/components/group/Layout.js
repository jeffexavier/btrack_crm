
import AddGroupButton from "../buttons/AddGroupButton.js";
import UploadGroupButton from "./UploadGroupButton.js";
import FilterGroup from "./filterGroup.js";

export default function Layout({children, getGroups}) {
  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      {/* <h2>Grupos</h2>       */}
      <div className="flex justify-between">
        <AddGroupButton getGroups={getGroups} />
        {/* <FilterGroup /> */}
        <UploadGroupButton getGroups={getGroups}/>
        </div> 
    
      <main className="flex-1">{children}</main>
    </div>
  )
}