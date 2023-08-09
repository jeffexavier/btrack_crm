'use-client'

import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";
import formatDateToLocaleDateString from "@/src/backend/utils/formatDateToLocaleDateString.js";
import EditRevenueButton from "@/src/components/revenue/EditRevenueButton.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";
import { Button, Table, Tooltip } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@/public/icons.js";

export default function RevenueList({listedRevenuess}) {

  const [listedRevenues, setListedRevenues] = useState([]);


  async function getRevenues() {
    const revenueList = await fetch('/api/revenue').then((response) => {
      return response.json()
    })
    setListedRevenues(revenueList.value)
  }


  useEffect(() => {
    getRevenues();
  }, [])


  return (
    <InternalLayout>
      <Layout>
      <div className="flex min-w-full">
          <Table aria-label="Select All" striped borderWeight={0} css={{padding: "0"}}
            shadow="false" color="secondary"
          >
          <Table.Header>
            <Table.Column>Empresa</Table.Column>
            <Table.Column>Porte</Table.Column>
            <Table.Column>Tipo</Table.Column>
            <Table.Column>Valor</Table.Column>
            <Table.Column>Assinaturas</Table.Column>
            <Table.Column>Data</Table.Column>
            <Table.Column>Motivo</Table.Column>
            <Table.Column>Fator</Table.Column>
            <Table.Column>Descrição</Table.Column>
            <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
        {listedRevenues.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.group.name_contract}</Table.Cell>
                <Table.Cell>{item.group.size}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.value}</Table.Cell>
                <Table.Cell>{item.license_qty}</Table.Cell>
                <Table.Cell>{formatDateToLocaleDateString(item.dt_request)}</Table.Cell>
                <Table.Cell>{item.request_reason.value}</Table.Cell>
                <Table.Cell>{item.request_factor}</Table.Cell>
                <Table.Cell>{item.request_description}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-between">
                    <EditRevenueButton revenueData={item} />
                    <Tooltip color="error" placement="right" content="Excluir registro">
                      <Button auto light color="error" icon={<TrashIcon width="18px"/>} />
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
        ))}
            </Table.Body>
          </Table>
      </div>
      </Layout>
    </InternalLayout>
  )
}

export async function getServerSideProps(context) {

  const cookies = parseCookies(context);
  const token = cookies.authorization;
  try {
    verifyToken(token);
    const verifiedToken = verifyToken(token);
    return {
      props: { userData: verifiedToken },
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