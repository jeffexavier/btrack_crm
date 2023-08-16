import { PlusIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";

export default function Layout({children, getRevenues}) {
  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      {/* <h2>Grupos</h2>       */}
      <div>
      <Button flat auto color="secondary" icon={<PlusIcon width="18px"/>} onPress={() => openModal()}>Adicionar NPS</Button>
        </div> 
    
      <main className="flex-1">{children}</main>
    </div>
  )
}