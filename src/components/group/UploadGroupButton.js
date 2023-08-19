import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";
import { createGroup } from "@/src/backend/utils/group.js";
import { ChevronDownIcon, DocumentPlusIcon, XCircleIcon } from "@/public/icons.js";
import UploadReportButton from "./UploadReportButton.js";
import formatDate from "@/src/backend/utils/formatDate.js"

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

  function onHandleFormEdit(e, name, index) {

    const newFormData = [...formData]
    newFormData[index].value = e
    newFormData[index].match = csvData[0][e]

    setFormData(newFormData)
    // console.log(newFormData)
  }

  async function onHandleFormSubmit() {

    const newCsvData = csvData.slice(1, csvData.length)

    let i = 0

    const reports = []

  setTimeout(() => {
    getGroups()  
  }, 2000);    
    while (i < newCsvData.length) {
      const newFormData = {
        id_legacy: newCsvData[i][formData[0].value],
        name_contract: newCsvData[i][formData[1].value],
        name: newCsvData[i][formData[2].value],
        contract_cnpj: newCsvData[i][formData[3].value],
        status: newCsvData[i][formData[4].value],
        cs: newCsvData[i][formData[5].value],
        csm: newCsvData[i][formData[6].value],
        dt_insert: newCsvData[i][formData[7].value],
        segment: newCsvData[i][formData[8].value],
        city: newCsvData[i][formData[9].value],
        state: newCsvData[i][formData[10].value],
        country: newCsvData[i][formData[11].value],
        address: newCsvData[i][formData[12].value],
        address_number: newCsvData[i][formData[13].value],
        stage: newCsvData[i][formData[14].value],
        dt_stage: newCsvData[i][formData[15].value],
        size: newCsvData[i][formData[16].value],
        plan: newCsvData[i][formData[17].value],
        dt_register: formatDate(newCsvData[i][formData[18].value]),
        dt_insert: newCsvData[i][formData[19].value],
        dt_update: newCsvData[i][formData[20].value],
        dt_cancel: newCsvData[i][formData[21].value],
        cancel_tag: newCsvData[i][formData[22].value],
        cancel_factor: newCsvData[i][formData[23].value],
        cancel_description: newCsvData[i][formData[14].value]
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
      { name: "id_legacy" },
      { name: "name_contract" },
      { name: "name" },
      { name: "contract_cnpj" },
      { name: "status" },
      { name: "cs" },
      { name: "csm" },
      { name: "dt_insert" },
      { name: "segment" },
      { name: "city" },
      { name: "state" },
      { name: "country" },
      { name: "address" },
      { name: "address_number" },
      { name: "stage" },
      { name: "dt_stage" },
      { name: "size" },
      { name: "plan" },
      { name: "dt_register" },
      { name: "dt_insert" },
      { name: "dt_update" },
      { name: "dt_cancel" },
      { name: "cancel_tag" },
      { name: "cancel_factor" },
      { name: "cancel_description" }
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
                <Dropdown.Menu onAction={(e) => onHandleFormEdit(e, item.name, index)}>
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
        <Button flat  color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onHandleFormSubmit(formData)}>Upload File</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}