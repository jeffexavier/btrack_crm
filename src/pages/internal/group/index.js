// import { parseCookies } from "nookies";
import { useEffect, useState, useMemo } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { Card, Text, Button, Grid, Row, Col } from "@nextui-org/react";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants.js";
import InternalLayout from "@/src/components/InternalLayout";
import { ArrowPathIcon, TrashIcon } from "@/public/icons";
import Layout from "@/src/components/group/Layout.js";
import axios from "axios";
import DetailGroupButton from "@/src/components/buttons/DetailGroupButton.js";
import EditGroupButton from "@/src/components/buttons/EditGroupButton.js"
import DeleteGroupButton from "@/src/components/buttons/DeleteGroupButton.js";

export default function Clientes() {
  const [groups, setGroups] = useState([]);

  async function getGroups() {
    const listGroups = await fetch('/api/group').then((response) => {
      return response.json()
    })

    const listedGroups = listGroups.value.reverse()
    setGroups(listedGroups)
    // console.log(listGroups)
  }

  useEffect(() => {
    getGroups()
  }, []);

  return (
    <InternalLayout>
      <Layout>
        {/* <div className="flex justify-between">
          <Button
            bordered
            auto
            color="secondary"
            onPress={() => {
              getCustomers();
            }}
            css={{ gridColumn: 4 }}
          >
            <ArrowPathIcon height="24px" />
          </Button>
        </div> */}
        <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((item, index) => (
              <Card borderWeight="0" isHoverable variant="shadow">
                <Card.Header>
                <div className="flex justify-between w-full align-middle">
                    <Text b size="$xl">{item.name_contract}</Text>
                    <DeleteGroupButton groupId={item._id} groupName={item.name_contract}/>
                    </div>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                  <Text size="$sm">
                    <b>Nome da empresa:</b> {item.name}
                  </Text>
                  <Text size="$sm">
                    <b>CNPJ:</b> {item.contract_cnpj}
                  </Text>
                  <Text size="$sm">
                    <b>Segmento:</b> {item.segment}
                  </Text>
                  <Text size="$sm">
                    <b>Porte:</b> {item.size}
                  </Text>
                  <Text size="$sm">
                    <b>Plano:</b> {item.plan}
                  </Text>
                </Card.Body>
                <Card.Divider />
                <Card.Footer justify="between">
                  <Col>
                    <Text h6>
                      {new Date(item.dt_register).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                      {item.dt_cancel !== null
                        ? ` - ${new Date(item.dt_cancel).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}`
                        : ""}
                    </Text>
                    </Col>
                    <div className="flex md:flex-col lg:flex-row gap-2">
                    <DetailGroupButton groupId={item._id}/>
                    <EditGroupButton groupId={item._id}/>
                    </div>
                </Card.Footer>
              </Card>
          ))}
          </div>
      </Layout>
    </InternalLayout>
  );
}


