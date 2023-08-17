import { PlusIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";

import AddNpsButton from "./AddNpsButton.js";

export default function Layout({children, getNpsList}) {




  return (
    <div className="flex flex-col p-5 gap-3 justify-between">
      <div>
      <AddNpsButton getNpsList={getNpsList}/>
        </div>    
      <main className="flex-1">{children}</main>
    </div>
  )
}