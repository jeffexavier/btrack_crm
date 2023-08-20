import { Button, Dropdown, Input, Modal } from "@nextui-org/react";
import Papa from 'papaparse'
import { useState } from "react";
import { createGroup } from "@/src/backend/utils/group.js";
import { ChevronDownIcon } from "@/public/icons.js";

const acceptableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv';

export default function Upload() {

  const [csvData, setCsvData] = useState([])
  const [formData, setFormData] = useState({})
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

  function onHandleFormEdit(e, name) {

    const newFormData = {...formData, [name]: {name: csvData[0][e], value: e}}

    setFormData(newFormData)
    console.log(newFormData)
  }

  const campos = [
    {
      name: "id_legacy"
    },
    {
      name: "name_contract"
    },
    {
      name: "name"
    },
    {
      name: "contract_cnpj"
    },
    {
      name: "status"
    },
    {
      name: "cs"
    },
    {
      name: "csm"
    },
    {
      name: "dt_insert"
    },
    {
      name: "segment"
    },
    {
      name: "city"
    },
    {
      name: "state"
    },
    {
      name: "country"
    },
    {
      name: "address"
    },
    {
      name: "address_number"
    },
    {
      name: "stage"
    },
    {
      name: "dt_stage"
    },
    {
      name: "size"
    },
    {
      name: "plan"
    },
    {
      name: "dt_register"
    },
    {
      name: "dt_insert"
    },
    {
      name: "dt_update"
    },
    {
      name: "dt_cancel"
    },
    {
      name: "cancel_tag"
    },
    {
      name: "cancel_factor"
    },
    {
      name: "cancel_description"
    }
  ]

  async function onHandleFormSubmit(body) {

    const newCsvData = csvData.slice(1, csvData.length)

    let i = 0

    while (i < newCsvData.length) {
      const newFormData = {
        ...formData,
        name_contract: newCsvData[i][formData.name.value],
        id_legacy: newCsvData[i][formData.id_legacy.value],
        name_contract: newCsvData[i][formData.name_contract.value],
        name: newCsvData[i][formData.name.value],
        contract_cnpj: newCsvData[i][formData.contract_cnpj.value],
        status: newCsvData[i][formData.status.value],
        cs: newCsvData[i][formData.cs.value],
        csm: newCsvData[i][formData.csm.value],
        dt_insert: newCsvData[i][formData.dt_insert.value],
        segment: newCsvData[i][formData.segment.value],
        city: newCsvData[i][formData.city.value],
        state: newCsvData[i][formData.state.value],
        country: newCsvData[i][formData.country.value],
        address: newCsvData[i][formData.address.value],
        address_number: newCsvData[i][formData.address_number.value],
        stage: newCsvData[i][formData.stage.value],
        dt_stage: newCsvData[i][formData.dt_stage.value],
        size: newCsvData[i][formData.size.value],
        plan: newCsvData[i][formData.plan.value],
        dt_register: newCsvData[i][formData.dt_register.value],
        dt_insert: newCsvData[i][formData.dt_insert.value],
        dt_update: newCsvData[i][formData.dt_update.value],
        dt_cancel: newCsvData[i][formData.dt_cancel.value],
        cancel_tag: newCsvData[i][formData.cancel_tag.value],
        cancel_factor: newCsvData[i][formData.cancel_factor.value],
        cancel_description: newCsvData[i][formData.cancel_description.value]
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
        <Input
        type="file"
        id="csvFileSelector"
        aria-label="file"
        accept={acceptableCSVFileTypes}
        onChange={(e) => onChangeFileInput(e)}
        />
        <div className="grid gap-4">
          {campos.map((item, index) => (
            <div className="flex justify-center gap-2">
              <div className="min-w-[150px] bg-secondary-flat rounded-xl p-2">
                <p>{item.name}</p>
              </div>
              <Dropdown>
                <Dropdown.Trigger>
                  <Button icon={<ChevronDownIcon width="18px"/>}>{"teste"}</Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onAction={(e) => onHandleFormEdit(e, item.name)}>
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