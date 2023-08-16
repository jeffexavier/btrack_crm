
import RevenueModal from "./RevenueModal.js";


export default function Layout({children, getRevenues}) {
  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      {/* <h2>Grupos</h2>       */}
      <div>
        <RevenueModal getRevenues={getRevenues} />
        </div> 
    
      <main className="flex-1">{children}</main>
    </div>
  )
}