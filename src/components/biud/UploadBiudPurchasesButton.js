import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";

import { ChevronDownIcon, DocumentPlusIcon, XCircleIcon } from "@/public/icons.js";
import UploadReportButton from "../buttons/UploadReportButton.js";
import formatClassicDate from "@/src/backend/utils/formatClassicDate.js";

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
        const newFormData = {
          token: tokenBiud,
          total_value: getCsvData(indexCsv, 0),
          discount: getCsvData(indexCsv, 1),
          nfe: getCsvData(indexCsv, 2),
          date: formatClassicDate(getCsvData(indexCsv, 3)),
          observation: getCsvData(indexCsv, 4),
          customer: {
            cpf: getCsvData(indexCsv, 5),
            forceUpdateData: getCsvData(indexCsv, 6),
            name: getCsvData(indexCsv, 7),
            phone: getCsvData(indexCsv, 8),
            email:getCsvData(indexCsv, 9),
            gender: getCsvData(indexCsv, 10),
            born_at: formatClassicDate(getCsvData(indexCsv, 11)),
            address: {
              postal_code: getCsvData(indexCsv, 12),
              street: getCsvData(indexCsv, 13),
              district: getCsvData(indexCsv, 14),
              complement: getCsvData(indexCsv, 15),
              number: getCsvData(indexCsv, 16),
              city: getCsvData(indexCsv, 17),
              uf: getCsvData(indexCsv, 18)
            }
          },
          products: [
            {
              code: getCsvData(indexCsv, 19),
              discount: getCsvData(indexCsv, 20),
              description: getCsvData(indexCsv, 21),
              quantity: getCsvData(indexCsv, 22),
              cfop: getCsvData(indexCsv, 23),
              value: getCsvData(indexCsv, 24)
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
    
    // setTimeout(() => {
    //   getList()  
    // }, 2000);  

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
      <Button flat auto color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onOpenButton()}>Upload Purchases CSV</Button>
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
        <Button flat disabled={csvData.length > 0 ? false : true} color="secondary" icon={<DocumentPlusIcon width={18} />} onPress={() => onHandleFormSubmit(formData)}>Upload Purchases File</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}