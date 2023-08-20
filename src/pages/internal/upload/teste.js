import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";
import { createGroup } from "@/src/backend/utils/group.js";
import { ChevronDownIcon } from "@/public/icons.js";

const acceptableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv';

export default function UploadGroupModal() {

  const [csvData, setCsvData] = useState([])
  const [formData, setFormData] = useState([
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
  ])
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
    console.log(newFormData)
  }

  async function onHandleFormSubmit(body) {

    const newCsvData = csvData.slice(1, csvData.length)

    let i = 0

    while (i < newCsvData.length) {
      const newFormData = {
        ...formData,
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
        dt_register: newCsvData[i][formData[18].value],
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
    }
  }


  return (
    <>
      <Button onPress={() => setIsVisible(true)}>Abrir modal</Button>
      <Modal
        open={isVisible}
        closeButton
        onClose={() => setIsVisible(false)}
      >
      <Modal.Header>
        Adicione o arquivo CSV
      </Modal.Header>
      <Modal.Body>
      <>

      </> 
        <div a="file" onDrop={(e) => {e.preventDefault(); console.log(e)}} className="flex flex-col min-h-[80px] text-center justify-center items-center bg-secondary-flat rounded-xl">
        <input
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
          {formData.map((item, index) => (
            <div className="flex justify-center gap-2">
              <div className="min-w-[150px] bg-secondary-flat rounded-xl py-2 px-4">
                <p>{item.name}</p>
              </div>
              <Dropdown isDisabled={csvData.length > 0 ? false : true}>
                <Dropdown.Trigger>
                  <Button bordered={formData[index].match ? false : true} icon={<ChevronDownIcon width="18px"/>}>{formData[index].match || ""}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onHandleFormEdit(e, item.name, index)}>
                  {csvData.length > 0 ? csvData[0].map((item, index) => (
                    <Dropdown.Item key={index}>{item}</Dropdown.Item>
                  )) : ''}

                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </div>
        {/* {csvData.length > 0 ? csvData[0].map((item, index) => (
          <p key={index}>{item}</p>
        )) : ''} */}
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={() => onHandleFormSubmit(formData)}>Upload File</Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}