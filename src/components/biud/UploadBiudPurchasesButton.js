import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";

import { ChevronDownIcon, DocumentPlusIcon, XCircleIcon } from "@/public/icons.js";
import UploadReportButton from "../buttons/UploadReportButton.js";
import formatClassicDate from "@/src/backend/utils/formatClassicDate.js";

const acceptableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv';

export default function UploadBiudPurchasesButton({getList, list, createFunction}) {

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

  }

  async function onHandleFormSubmit() {

    const newCsvData = csvData.slice(1, csvData.length)

    function getCsvData(indexCsv, indexForm){
      if(formData[indexForm].value === null) {
        return null
      }
      return newCsvData[indexCsv][formData[indexForm].value]
    }     
    
    const reports = []    
    
    newCsvData.forEach(async (itemCsv, indexCsv) => {  
      let newFormData = {}      
      
        newFormData = { ...newFormData,
          token: "0006faf6-7a61-426c-9034-579f2cfcfa83",
          total_value: null,
          discount: null,
          nfe: null,
          date: null,
          observation: null,
          customer: {
            cpf: null,
            forceUpdateData: null,
            name: null,
            phone: null,
            email:null,
            gender: null,
            born_at: null,
            address: {
              postal_code: null,
              street: null,
              district: null,
              complement: null,
              number: null,
              city: null,
              uf: null
            }
          },
          products: [
            {
              code: null,
              discount: null,
              description: null,
              quantity: null,
              cfop: null,
              value: null
            }
          ]
        }
    
        const groupCreate = await createFunction(newFormData)
        console.log(groupCreate)
    
        if(groupCreate._id) {
          reports.push({...newFormData, upload_status: "success", return: groupCreate._id})
        } else if(groupCreate.message) {
          reports.push({...newFormData, upload_status: "error", return: groupCreate.message})
        } else{
          console.log(JSON.stringify(groupCreate))
          // reports.push({...newFormData, upload_status: "error", return: `Group with CNPJ ${newFormData.contract_cnpj} already exists!`})
          reports.push({...newFormData, upload_status: "error", return: JSON.stringify(groupCreate)})
        }
    
        if(indexCsv === newCsvData.length - 1) {
          setUploadReport(reports)
          console.log(reports)
        }

    })
    
    setTimeout(() => {
      getList()  
    }, 2000);  

  }

  function onCloseButton() {
    setFormData([])
    setIsVisible(false)
    setCsvData([])
    setUploadReport([])
  }
  
  function onOpenButton() {
    setIsVisible(true)

    const listKeys = Object.entries(list)
    const newList = []
    listKeys.forEach(item => {
      if(item[1] && item[1].type === 'date') {
        newList.push({name: item[0], value: null, type: 'date'})
      } else {
        newList.push({name: item[0], value: null, type: null})
      }
    })
    console.log(newList)
    setFormData(newList)
  }

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