// import { parseCookies } from "nookies";
import { useEffect, useState, useMemo } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { Card, Text, Button, Grid, Row, Col } from "@nextui-org/react";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants.js";
import InternalLayout from "@/src/components/InternalLayout";
import { ArrowPathIcon } from "@/public/icons";
import Layout from "@/src/components/sensedata/Layout.js";
import axios from "axios";
import DetailGroupButton from "@/src/components/buttons/DetailGroupButton.js";
import EditGroupButton from "@/src/components/buttons/EditGroupButton.js"

export default function Clientes() {
  const [groups, setGroups] = useState([]);

  async function getGroups() {
    const listGroups = await fetch('/api/group').then((response) => {
      return response.json()
    })
    setGroups(listGroups.value)
    console.log(listGroups)
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
        <Grid.Container gap={2} justify="flex-start">
          {groups.map((item, index) => (
            <Grid xs={10} sm={4}>
              <Card borderWeight="0" isHoverable variant="shadow">
                <Card.Header>
                  <Row align="center">
                    <Text b size="$xl">{item.name_contract}</Text>
                  </Row>
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
                  <Row justify="space-between" align="center">
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
                    <div className="flex justify-between gap-2">
                    <DetailGroupButton groupId={item._id}/>
                    <EditGroupButton groupId={item._id}/>
                    </div>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Layout>
    </InternalLayout>
  );
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
