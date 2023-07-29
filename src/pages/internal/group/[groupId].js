import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";
import { useEffect, useState } from "react";
import { Input, Card, Text, Container, Row, Col, Textarea, Button, Divider } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import formatDate from "@/src/backend/utils/formatDate.js";
import { updateGroup } from "@/src/backend/utils/group.js";


export default function GroupId({listedGroups}) {

  const [groupData, setGroupData] = useState(listedGroups)

  const [isEditable, setIsEditable] = useState(false)
  const [editButton, setEditButton] = useState(isEditable === false ? "Editar" : "Salvar")

  const [formData, setFormData] = useState({
    name_contract: groupData.name_contract,
    name: groupData.name,
    id_legacy: groupData.id_legacy,
    contract_cnpj: groupData.contract_cnpj,
    status: groupData.status,
    cs: groupData.cs,
    csm: groupData.csm,
    dt_register: groupData.dt_register ? formatDate(groupData.dt_register) : "",
    dt_insert: groupData.dt_insert ? formatDate(groupData.dt_insert) : "",
    segment: groupData.segment,
    city: groupData.city,
    state: groupData.state,
    country: groupData.country,
    address: groupData.address,
    address_number: groupData.address_number,
    stage: groupData.stage,
    dt_stage: groupData.dt_stage ? formatDate(groupData.dt_stage) : "",
    size: groupData.size,
    plan: groupData.plan,
    dt_cancel: groupData.dt_cancel ? formatDate(groupData.dt_cancel) : "",
    cancel_tag: groupData.cancel_tag,
    cancel_factor: groupData.cancel_factor,
    cancel_description: groupData.cancel_description
  })

  function handleFormEdit(e, name) {
    setFormData({
      ...formData,
      [name]: e.target.value
    })
  }

  async function handleFormSubmit(id, body) {
    if(isEditable === false) {
      setIsEditable(true)
      setEditButton("Salvar")
    } else {
      const updatedGroup = await updateGroup(id, body)
      setIsEditable(false)
      setEditButton("Editar")
    }
  }

  function cancelEdit() {
    if(isEditable === false) {
      setIsEditable(true)
      setEditButton("Salvar")
    } else {
      setIsEditable(false)
      setEditButton("Editar")
    }
  }

  async function getGroup(_id) {
    const getGroupData = await fetch(`/api/group?id=${_id}`).then(
      (response) => {
        return response.json();
      }
    );
    const newGroupData = getGroupData;
    setGroupData(newGroupData.value);
  }

  useEffect(() => {
    // getGroup(groupId);
  }, []);

  return (
    <InternalLayout>
      <Layout>
        <div className="flex gap-4">
        <div>
              <Card variant="bordered" color="secondary">
                <Card.Header>
                  <div className="min-w-[340px]">
                    <Text h4>{groupData.name_contract}</Text>
                    <Text size={12}>{groupData._id}</Text>
                  </div>
                </Card.Header>
                <Card.Divider/>
                <Card.Body>
                <div className="flex flex-col gap-4">
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'name_contract')}} label="Nome Fantasia" initialValue={formData.name_contract} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'name')}} label="Razão Social" initialValue={formData.name} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'id_legacy')}} label="ID Legado" initialValue={formData.id_legacy} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'contract_cnpj')}} label="CNPJ" initialValue={formData.contract_cnpj} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'cs')}} label="CS" initialValue={formData.cs} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'csm')}} label="CSM" initialValue={formData.csm} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="date" onChange={(e) => {handleFormEdit(e, 'dt_register')}} label="Data registro" initialValue={formData.dt_register} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="date" onChange={(e) => {handleFormEdit(e, 'dt_insert')}} label="Data inserção" initialValue={(formData.dt_insert)} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'city')}} label="Cidade" initialValue={formData.city} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'state')}} label="Estado" initialValue={formData.state} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'country')}} label="País" initialValue={formData.country} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'address')}} label="Endereço" initialValue={formData.address} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'address_number')}} label="Número" initialValue={formData.address_number} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'stage')}} label="Fase" initialValue={formData.stage} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="date" onChange={(e) => {handleFormEdit(e, 'dt_stage')}} label="Data fase" initialValue={formData.dt_stage} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'size')}} label="Porte" initialValue={formData.size} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'plan')}} label="Plano" initialValue={formData.plan} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'status')}} label="Status" initialValue={formData.status} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'segment')}} label="Segmento" initialValue={formData.segment} />
                  <Divider />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="date" onChange={(e) => {handleFormEdit(e, 'dt_cancel')}} label="Data cancelamento" initialValue={formData.dt_cancel} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'cancel_tag')}} label="Motivo cancelamento" initialValue={formData.cancel_tag} />
                  <Input bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'cancel_factor')}} label="Fator cancelamento" initialValue={formData.cancel_factor} />
                  <Textarea bordered animated readOnly={!isEditable} color={isEditable === false ? "secondary" : "success"} type="text" onChange={(e) => {handleFormEdit(e, 'cancel_description')}} label="Descrição cancelamento" initialValue={formData.cancel_description} />
                  </div>
                </Card.Body>
                <Card.Divider/>
                <Card.Footer css={{justifyContent:"flex-end"}}>
                <div className="flex gap-2 align-middle">
                  {isEditable === true ? <Button auto flat onPress={() => cancelEdit()} color="error">Cancelar</Button> : ""}                
                  <Button auto onPress={() => handleFormSubmit(groupData._id, formData)} color={isEditable === false ? "secondary" : "success"}>{editButton}</Button>
                  </div>                
                </Card.Footer>
                
              </Card>
              </div>
              <Card variant="bordered">
              <Card.Header><Text h4>Comentários</Text></Card.Header>
                <Card.Body></Card.Body>
              </Card>
        </div>
      </Layout>
    </InternalLayout>
  );
}

export async function getServerSideProps(context) {
    const {groupId} = context.query

    const listGroup = await fetch(`${process.env.APP_URL}/api/group?id=${groupId}`).then((response) => {
        return response.json()
    })

    const cookies = parseCookies(context);
    const token = cookies.authorization;
    try {
      verifyToken(token);
      const verifiedToken = verifyToken(token);
      return {
        props: { userData: verifiedToken, listedGroups: listGroup.value },
      };
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }