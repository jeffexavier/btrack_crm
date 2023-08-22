import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";
import { createGroup } from "@/src/backend/utils/group.js";
import { ChevronDownIcon, DocumentPlusIcon, XCircleIcon } from "@/public/icons.js";
import UploadReportButton from "./UploadReportButton.js";
import formatClassicDate from "@/src/backend/utils/formatClassicDate.js";

const acceptableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv';

export default function UploadGroupButton({getGroups}) {

  const [csvData, setCsvData] = useState([])
  const [formData, setFormData] = useState([])
  const [uploadReport, setUploadReport] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  function onChangeFileInput(e) {
    console.log(e.target.files[0])

    Papa.parse(e.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data)
        console.log(results.data)
      }
    });
  }

  function onHandleFormEdit(e, index) {

    const newFormData = [...formData]
    newFormData[index].value = e
    newFormData[index].match = csvData[0][e]

    setFormData(newFormData)
    // console.log(newFormData)
  }

  async function onHandleFormSubmit() {

    const newCsvData = csvData.slice(1, csvData.length)

    function getCsvData(index){
      if(formData[index].value === null) {
        return null
      }
      return newCsvData[i][formData[index].value]
    }

    let i = 0

    const reports = []

  setTimeout(() => {
    getGroups()  
  }, 2000);    
    while (i < newCsvData.length) {
      const newFormData = {
        id_legacy: getCsvData(0),
        name_contract: getCsvData(1),
        name: getCsvData(2),
        contract_cnpj: getCsvData(3),
        status: getCsvData(4),
        cs: getCsvData(5),
        csm: getCsvData(6),
        segment: getCsvData(7),
        city: getCsvData(8),
        state: getCsvData(9),
        country: getCsvData(10),
        address: getCsvData(11),
        address_number: getCsvData(12),
        stage: getCsvData(13),
        dt_stage: formatClassicDate(getCsvData(14)),
        size: getCsvData(12),
        plan: getCsvData(16),
        dt_register: formatClassicDate(getCsvData(17)),
        dt_insert: formatClassicDate(getCsvData(18)),
        dt_update: formatClassicDate(getCsvData(19)),
        dt_cancel: formatClassicDate(getCsvData(20)),
        cancel_tag: getCsvData(21),
        cancel_factor: getCsvData(22),
        cancel_description: getCsvData(23)
      }


      i++


      const groupCreate = await createGroup(newFormData)
      console.log(groupCreate)
      
      if(groupCreate._id) {
        reports.push({...newFormData, upload_status: "success", return: groupCreate._id})
      } else if(groupCreate.code === 11000) {
        reports.push({...newFormData, upload_status: "error", return: `Group with CNPJ ${newFormData.contract_cnpj} already exists!`})
      } else {
        reports.push({...newFormData, upload_status: "error", return: groupCreate.message})
      }

      if(i === newCsvData.length) {
        setUploadReport(reports)
      }
    }
  }

  function onCloseButton() {
    setFormData([])
    setIsVisible(false)
    setCsvData([])
    setUploadReport([])
  }
  
  function onOpenButton() {
    setIsVisible(true)
    setFormData(content)
  }

  const content = [
      { name: "id_legacy", value: null },
      { name: "name_contract", value: null },
      { name: "name", value: null },
      { name: "contract_cnpj", value: null },
      { name: "status", value: null },
      { name: "cs", value: null },
      { name: "csm", value: null },
      { name: "segment", value: null },
      { name: "city", value: null },
      { name: "state", value: null },
      { name: "country", value: null },
      { name: "address", value: null },
      { name: "address_number", value: null },
      { name: "stage", value: null },
      { name: "dt_stage", value: null },
      { name: "size", value: null },
      { name: "plan", value: null },
      { name: "dt_register", value: null },
      { name: "dt_insert", value: null },
      { name: "dt_update", value: null },
      { name: "dt_cancel", value: null },
      { name: "cancel_tag", value: null },
      { name: "cancel_factor", value: null },
      { name: "cancel_description", value: null }
    ]


  return (
    <>
      <Button flat auto color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onOpenButton()}>Upload CSV</Button>
      <Modal
        open={isVisible}
        closeButton
        onClose={() => onCloseButton()}
      >
      <Modal.Header>
        <Text>Upload CSV</Text>
      </Modal.Header>
      <Modal.Body>
      <>

      </> 
        <div a="file" onDrop={(e) => {e.preventDefault(); console.log(e)}} className={`flex flex-col min-h-[80px] text-center justify-center items-center ${csvData.length > 0 ? "bg-secondary-flat border-0" : "bg-[#fff] border-2"} border-secondary-full rounded-xl`}>
        <input
        className="text-secondary-full"
        type="file"
        id="csvFileSelector"
        aria-label="file"
        name="InputFile"
        accept={acceptableCSVFileTypes}
        onChange={(e) => onChangeFileInput(e)}
        onDrop={(e) => {console.log(e)}}
        />
        </div> 
        <div className="grid gap-4">
        {csvData.length > 0 ? <>
          {formData.map((item, index) => (
            <div className="flex justify-center gap-2">
              <div className="min-w-[150px] bg-secondary-full rounded-xl py-2 px-4 text-[#fff] font-semibold">
                <p>{item.name}</p>
              </div>
              <Dropdown isDisabled={csvData.length > 0 ? false : true}>
                <Dropdown.Trigger>
                  <Button flat bordered={formData[index].match ? false : true} color="secondary" icon={<ChevronDownIcon width="18px"/>}>{formData[index].match || ""}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onHandleFormEdit(e, index)}>
                  <Dropdown.Item key={null}>{""}</Dropdown.Item>
                  {csvData.length > 0 ? csvData[0].map((item, index) => (
                    <Dropdown.Item key={index}>{item}</Dropdown.Item>
                  )) : ''}

                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))} </>
        : ""
        }
        </div>
        {uploadReport.length > 0 ?
        <UploadReportButton uploadReport={uploadReport} />
        : ""
        }
      </Modal.Body>
      <Modal.Footer>
          <Button
            light
            auto
            color="error"
            icon={<XCircleIcon width="18px" />}
            onPress={() => onCloseButton()}
          >
            Cancelar
          </Button>
        <Button flat disabled={csvData.length > 0 ? false : true} color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onHandleFormSubmit(formData)}>Upload File</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}