import { ArrowDownTrayIcon } from "@/public/icons.js";
import { Button } from "@nextui-org/react";
import { get } from "mongoose";
import Papa from 'papaparse'

export default function DownloadListButton({listForDownload, nameForDownload, areaForDownload}) {

  async function downloadCsv(array, name, area) {
    
    const csv = Papa.unparse(array, {
      delimiter: ";"
    })
  
    const csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const blobURL = URL.createObjectURL(csvData);
  
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = name.replace(/[./]/g, '_') + "_lista_" + area + "_" + new Date().toLocaleDateString('pt-BR') + ".csv";
    link.click();
  }

  return(
    <>
      <Button light auto color="secondary" icon={<ArrowDownTrayIcon width="18px" />} onPress={() => downloadCsv(listForDownload, nameForDownload, areaForDownload)}/>
    </>
  )

}

