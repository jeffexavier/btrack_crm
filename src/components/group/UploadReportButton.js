import { DocumentArrowDownIcon, ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@/public/icons.js"
import { Button, Modal } from "@nextui-org/react"
import { useState } from "react"
import Papa from 'papaparse'

export default function UploadReportButton({uploadReport}) {

  const [isVisible, setIsVisible] = useState(false)

  function onOpenButton(list) {
    setIsVisible(true)
    console.log(list)
  }

  function onCloseButton() {
    setIsVisible(false)
  }
  
  async function downloadCsv(name, area) {

    const csv = Papa.unparse(uploadReport, {
      delimiter: ";"
    })

    // const response = await fetch(url);
    const csvData = await new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const blobURL = URL.createObjectURL(csvData);

    const link = document.createElement('a');
    link.href = blobURL;
    link.download = name.replace(/[./]/g, '_') + "_lista_" + area + "_" + new Date().toLocaleDateString('pt-BR') + ".csv";
    link.click();
  }

  return(
    <>
  <Button auto color="error" size="xs" icon={<ExclamationTriangleIcon width="18px"/>} onPress={() => onOpenButton(uploadReport)}>Relatório</Button>
  <Modal
  scroll
    width="full"
    open={isVisible}
    closeButton
    onClose={() => setIsVisible(false)}
  >
  <Modal.Header>
    Relatório
  </Modal.Header>
    <Modal.Body>
      <div className="">
              <div className="table w-full rounded-xl overflow-hidden text-sm text-secondary-full">
              <div className="table-header-group table-auto font-semibold bg-secondary-flat">
                    <div className="table-row">
                      <div className="table-cell p-4">upload_status</div>
                      <div className="table-cell p-4">upload_return</div>
                      <div className="table-cell p-4">id_legacy</div>
                      <div className="table-cell p-4">name_contract</div>
                      <div className="table-cell p-4">name</div>
                      <div className="table-cell p-4">contract_cnpj</div>
                      <div className="table-cell p-4">status</div>
                      <div className="table-cell p-4">cs</div>
                      <div className="table-cell p-4">csm</div>
                      <div className="table-cell p-4">dt_insert</div>
                      <div className="table-cell p-4">segment</div>
                      <div className="table-cell p-4">city</div>
                      <div className="table-cell p-4">state</div>
                      <div className="table-cell p-4">country</div>
                      <div className="table-cell p-4">address</div>
                      <div className="table-cell p-4">address_number</div>
                      <div className="table-cell p-4">stage</div>
                      <div className="table-cell p-4">dt_stage</div>
                      <div className="table-cell p-4">size</div>
                      <div className="table-cell p-4">plan</div>
                      <div className="table-cell p-4">dt_register</div>
                      <div className="table-cell p-4">dt_insert</div>
                      <div className="table-cell p-4">dt_update</div>
                      <div className="table-cell p-4">dt_cancel</div>
                      <div className="table-cell p-4">cancel_tag</div>
                      <div className="table-cell p-4">cancel_factor</div>
                      <div className="table-cell p-4">cancel_description</div>
                    </div>
              </div>
              <div className="table-row-group">
                {uploadReport.map((item, index) => (
                  <div className={`table-row ${item.upload_status === "error" ? "bg-error-flat hover:bg-error-flat-hover" : "bg-[#fff] hover:bg-secondary-flat"} transition-colors ease-linear`}>
                    <div className="table-cell p-4"><div className="min-w-max">{item.upload_status}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max max-h-min overflow-auto">{item.return}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.id_legacy}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max max-h-min overflow-auto">{item.name_contract}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.name}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.contract_cnpj}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.status}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.cs}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.csm}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.dt_insert}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.segment}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.city}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.state}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.country}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.address}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.address_number}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.stage}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.dt_stage}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.size}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.plan}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.dt_register}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.dt_insert}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.dt_update}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.dt_cancel}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.cancel_tag}</div></div>
                    <div className="table-cell p-4"><div className="min-w-max">{item.cancel_factor}</div></div>
                    <div className="table-cell p-4"><div className="max-w-[210px] h-[20px] overflow-hidden  text-xs"><p className="text-ellipsis">{item.cancel_description}</p></div></div>
                </div>
                ))}
              </div>
              </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button light auto color="error" icon={<XCircleIcon width="18px"/>} onPress={() => onCloseButton()}>Cancelar</Button>
      <Button flat auto color="secondary" icon={<DocumentArrowDownIcon width="18px" />} onPress={() => downloadCsv('report_upload_lista', 'empresas')}>download</Button>
    </Modal.Footer>
  </Modal>
    </>
  )
}