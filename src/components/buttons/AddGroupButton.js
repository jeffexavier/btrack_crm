import { Button, Modal, Text, Input, Textarea, Divider, Collapse } from "@nextui-org/react";
import {
  PlusIcon,
  UserPlusIcon,
  PlusCircleIcon,
  SquaresPlusIcon,
  XCircleIcon,
  XMarkIcon,
} from "@/public/icons.js";
import { useState } from "react";
import { updateGroup, createGroup } from "@/src/backend/utils/group.js";
import formatDate from "@/src/backend/utils/formatDate.js";

export default function AddGroupButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState("Criar grupo");
  const [colorMessage, setColorMessage] = useState("secondary");
  const [errorMessage, setErrorMessage] = useState();
  const [inputCnpjColor, setInputCnpjColor] = useState("secondary");
  const [inputIdLegacyColor, setInputIdLegacyColor] = useState("secondary");

  const [formData, setFormData] = useState({
    // name_contract: "",
    // name: "",
    // id_legacy: "",
    // contract_cnpj: "",
    // status: "",
    // cs: "",
    // csm: "",
    // dt_register: "",
    // dt_insert: "",
    // segment: "",
    // city: "",
    // state: "",
    // country: "",
    // address: "",
    // address_number: "",
    // stage: "",
    // dt_stage: "",
    // size: "",
    // plan: "",
    // dt_cancel: "",
    // cancel_tag: "",
    // cancel_factor: "",
    // cancel_description: "",
  });

  function handleFormEdit(e, name) {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });

    if (name === "id_legacy") {
      setInputIdLegacyColor("secondary");
    } else if (name === "contract_cnpj") {
      setInputCnpjColor("secondary");
    }
  }

  async function handleFormSubmit(body) {
    const createdGroup = await createGroup(body);
    console.log(createdGroup);

    if (formData.id_legacy === "") {
      setInputIdLegacyColor("error");
    }

    if (formData.contract_cnpj === "") {
      setInputCnpjColor("error");
    }

    if (createdGroup._id) {
      setColorMessage("success");
      setInputMessage("Grupo criado");
      setTimeout(() => {
        setColorMessage("secondary");
        setIsVisible(false)
      }, 1000);
    } else {
      setColorMessage("error");
      setInputMessage("Erro");
      setErrorMessage("Verique os campos novamente.")
      setTimeout(() => {
        setColorMessage("secondary");
        setInputMessage("Criar grupo");
      }, 2000);
      setTimeout(() => {
        setErrorMessage();
      }, 4000);
    }

    // if (createdGroup._id) {
    //   setColorMessage("success");
    //   setInputMessage("Grupo criado");
    //   setTimeout(() => {
    //     setColorMessage("secondary");
    //     // setInputMessage("Criar grupo")
    //     // setIsVisible(false)
    //   }, 1000);
    // } else if (createdGroup.errors) {
    //   setErrorMessage("CNPJ não pode ser vazio!");
    // } else if (createdGroup.keyValue) {
    //   if (createdGroup.keyValue.id_legacy) {
    //     if (createdGroup.keyValue.id_legacy === "") {
    //       setErrorMessage("ID Legado não pode ser vazio!");
    //     } else if (createdGroup.keyValue.id_legacy !== "") {
    //       setErrorMessage("ID legado já existe!");
    //     }
    //     setColorMessage("error");
    //     setInputMessage("Erro");
    //     setTimeout(() => {
    //       setColorMessage("secondary");
    //       setInputMessage("Criar grupo");
    //     }, 2000);
    //   } else if (createdGroup.keyValue.contract_cnpj) {
    //     if (createdGroup.keyValue.contract_cnpj !== "") {
    //       setErrorMessage("CNPJ já existe!");
    //     }
    //     setColorMessage("error");
    //     setInputMessage("Erro");
    //     setTimeout(() => {
    //       setColorMessage("secondary");
    //       setInputMessage("Criar grupo");
    //     }, 2000);
    //   }
    // }
  }

  function openCreateGroupModal() {
    setIsVisible(true);
    setInputMessage("Criar grupo");
    setInputCnpjColor("secondary");
    setInputIdLegacyColor("secondary");
  }

  return (
    <>
      <Button
        auto
        color="secondary"
        icon={<PlusIcon width={18} />}
        onPress={() => openCreateGroupModal()}
      >
        Grupo
      </Button>

      <Modal closeButton width="600px" open={isVisible} onClose={() => setIsVisible(false)}>
        <Modal.Header justify="flex-start">
          <Text h4>Adicionar novo grupo</Text>
        </Modal.Header>
        <Modal.Body>
        <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Boteco da Dani"
            onChange={(e) => {
              handleFormEdit(e, "name_contract");
            }}
            label="Nome Fantasia"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Agatha LDTA"
            onChange={(e) => {
              handleFormEdit(e, "name");
            }}
            label="Razão Social"
          />
          <Input
            bordered
            animated
            color={inputIdLegacyColor}
            type="text"
            placeholder="99.999.999/9999-99"
            onChange={(e) => {
              handleFormEdit(e, "id_legacy");
            }}
            label="ID Legado *"
          />
          <Input
            bordered
            animated
            color={inputCnpjColor}
            type="text"
            placeholder="99999999999999"
            onChange={(e) => {
              handleFormEdit(e, "contract_cnpj");
            }}
            label="CNPJ - Somente números *"
          />
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="usuario@biud.com.br"
            onChange={(e) => {
              handleFormEdit(e, "cs");
            }}
            label="CS"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="usuario@biud.com.br"
            onChange={(e) => {
              handleFormEdit(e, "csm");
            }}
            label="CSM"
          />
          </div>

          <Divider/>
          <div className="grid grid-cols-2 gap-4">
          <Input
          fullWidth
            bordered
            animated
            color="secondary"
            type="date"
            onChange={(e) => {
              handleFormEdit(e, "dt_register");
            }}
            label="Data registro"
          />
          <Input
          fullWidth
            bordered
            animated
            color="secondary"
            type="date"
            onChange={(e) => {
              handleFormEdit(e, "dt_insert");
            }}
            label="Data inserção"
          />
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Brasília"
            onChange={(e) => {
              handleFormEdit(e, "city");
            }}
            label="Cidade"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Distrito Federal"
            onChange={(e) => {
              handleFormEdit(e, "state");
            }}
            label="Estado"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Brasil"
            onChange={(e) => {
              handleFormEdit(e, "country");
            }}
            label="País"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="St. de Habitações Individuais Sul QI 5"
            onChange={(e) => {
              handleFormEdit(e, "address");
            }}
            label="Endereço"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="30"
            onChange={(e) => {
              handleFormEdit(e, "address_number");
            }}
            label="Número"
          />
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Onboarding"
            onChange={(e) => {
              handleFormEdit(e, "stage");
            }}
            label="Fase"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="date"
            placeholder=""
            onChange={(e) => {
              handleFormEdit(e, "dt_stage");
            }}
            label="Data fase"
          />
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Large Account"
            onChange={(e) => {
              handleFormEdit(e, "size");
            }}
            label="Porte"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Store"
            onChange={(e) => {
              handleFormEdit(e, "plan");
            }}
            label="Plano"
          />
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Ativo"
            onChange={(e) => {
              handleFormEdit(e, "status");
            }}
            label="Status"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Alimentação e Bebidas"
            onChange={(e) => {
              handleFormEdit(e, "segment");
            }}
            label="Segmento"
          />
          </div>
          <Collapse title="Cancelamento">
          <div className="flex flex-col gap-4 p-1">
          <Input
            bordered
            animated
            color="secondary"
            type="date"
            placeholder=""
            onChange={(e) => {
              handleFormEdit(e, "dt_cancel");
            }}
            label="Data cancelamento"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="nao_e_icp"
            onChange={(e) => {
              handleFormEdit(e, "cancel_tag");
            }}
            label="Motivo cancelamento"
          />
          <Input
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="Incontrolável"
            onChange={(e) => {
              handleFormEdit(e, "cancel_factor");
            }}
            label="Fator cancelamento"
          />
          <Textarea
            bordered
            animated
            color="secondary"
            type="text"
            placeholder="O cliente não emite notas fiscais e não possui base de opt-in..."
            onChange={(e) => {
              handleFormEdit(e, "cancel_description");
            }}
            label="Descrição cancelamento"
          />
          </div>
          </Collapse>
          <div>
            <Text h6 color="error">{errorMessage}</Text>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer justify="flex-end">
          <Button
            flat
            auto
            color="error"
            icon={<XCircleIcon width="18px" />}
            onPress={() => setIsVisible(false)}
          >
            Cancelar
          </Button>
          <Button
            color={colorMessage}
            icon={<PlusIcon width="18px" />}
            onPress={() => handleFormSubmit(formData)}
          >
            {inputMessage}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
