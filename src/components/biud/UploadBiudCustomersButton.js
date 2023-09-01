import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";

import { ChevronDownIcon, DocumentPlusIcon, XCircleIcon } from "@/public/icons.js";
import UploadReportButton from "../buttons/UploadReportButton.js";
import formatClassicDate from "@/src/backend/utils/formatClassicDate.js";

import { unparseCustomersBiud } from "@/src/backend/utils/biud.js";

const acceptableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv';

export default function UploadBiudPurchasesButton({getList, list, createFunction, tokenBiud}) {

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

  async function onHandleFormSubmit2(csvData, formData, tokenBiud) {

    const newErrors = []

    const createdCustomersBiud = await unparseCustomersBiud(csvData, formData, tokenBiud);
    
    createdCustomersBiud.forEach((item, index) => {
      if(item.response.cause) {
        newErrors.push({upload_status: item.response.cause.code, return: item.response.cause.message})
      } else if (item.response.success === false) {
        newErrors.push({upload_status: "error", return: item.response.errors[0]})
      } else if ( item.success === true) {
        newErrors.push({upload_status: "success", return: item.response.messages[0]})
      }
    })

    setUploadReport(newErrors)
  }


  // async function onHandleFormSubmit() {

  //   const newCsvData = csvData.slice(1, csvData.length)

  //   function getCsvData(indexCsv, indexForm){
  //     if(formData[indexForm].value === null) {
  //       return null
  //     }
  //     return newCsvData[indexCsv][formData[indexForm].value]
  //   }     
    
  //   const reports = []    
    
  //   newCsvData.forEach(async (itemCsv, indexCsv) => {     
  //       const newFormData = {
  //           token: tokenBiud,
  //           cpf: getCsvData(indexCsv, 0),
  //           name: getCsvData(indexCsv, 1),
  //           email: getCsvData(indexCsv, 2),
  //           phone: getCsvData(indexCsv, 3),
  //           bornAt: formatClassicDate(getCsvData(indexCsv, 4)),
  //           gender: getCsvData(indexCsv, 5),
  //           forceUpdateData: getCsvData(indexCsv, 6),
  //           address: {
  //             postal_code: getCsvData(indexCsv, 7),
  //             street: getCsvData(indexCsv, 8),
  //             district: getCsvData(indexCsv, 9),
  //             complement: getCsvData(indexCsv, 10),
  //             number: getCsvData(indexCsv, 11),
  //             city: getCsvData(indexCsv, 12),
  //             uf: getCsvData(indexCsv, 13)
  //           }
  //         }

  //       console.log(newFormData)
    
  //       const groupCreate = await createFunction(newFormData)
  //       console.log(groupCreate)
    
  //       if(groupCreate._id) {
  //         reports.push({...newFormData, address: newFormData.address.toString(), upload_status: "success", return: groupCreate._id})
  //       } else if(groupCreate.message) {
  //         reports.push({...newFormData, address: newFormData.address.toString(), upload_status: "error", return: groupCreate.message})
  //       } else{
  //         console.log(JSON.stringify(groupCreate))
  //         // reports.push({...newFormData, upload_status: "error", return: `Group with CNPJ ${newFormData.contract_cnpj} already exists!`})
  //         reports.push({...newFormData, address: newFormData.address.toString(), upload_status: "error", return: JSON.stringify(groupCreate)})
  //       }
    
  //       if(indexCsv === newCsvData.length - 1) {
  //         setUploadReport(reports)
  //         console.log(reports)
  //       }

  //   })
    
  //   // setTimeout(() => {
  //   //   getList()  
  //   // }, 2000);  

  // }

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
      <Button flat auto color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onOpenButton()}>Upload Customers</Button>
      <Modal
        open={isVisible}
        closeButton
        onClose={() => onCloseButton()}
        width="500px"
      >
      <Modal.Header>
        <Text>Upload CSV</Text>
      </Modal.Header>
      <Modal.Body>
      <>

      </> 
        <div a="input" type="file" onDrop={(e) => {e.preventDefault(); console.log(e)}} className={`flex flex-col min-h-[80px] text-center justify-center items-center ${csvData.length > 0 ? "bg-secondary-flat border-0" : "bg-[#fff] border-2"} border-secondary-full rounded-xl`}>
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
              <div className="min-w-[250px] bg-secondary-full rounded-xl py-2 px-4 text-[#fff] font-semibold">
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
        {/* <Button flat disabled={csvData.length > 0 ? false : true} color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onHandleFormSubmit(formData)}>Upload Customers File</Button> */}
        <Button flat disabled={csvData.length > 0 ? false : true} color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onHandleFormSubmit2(csvData, formData, tokenBiud)}>Upload File 2</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}

