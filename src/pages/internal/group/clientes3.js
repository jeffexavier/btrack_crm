// import { parseCookies } from "nookies";
import { useEffect, useState, useMemo } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { Card, Text, Button, Grid, Row, Col } from "@nextui-org/react";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants.js";
import InternalLayout from "@/src/components/InternalLayout";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  QueueListIcon,
  TrashIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@/public/icons";
import Layout from "@/src/components/sensedata/Layout.js";
import axios from "axios";
import ModalListNotes from "@/src/components/sensedata/modalListNotes.js";
import ChurnButton from "@/src/components/buttons/ChurnButton.js";

export default function Clientes({ userData }) {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredGroupsByName, setFilteredGroupsByName] = useState([]);
  const [filteredGroupsByCS, setFilteredGroupsByCS] = useState([]);
  const [usersSenseData, setUsersSenseData] = useState([]);
  const [userName, setUserName] = useState("");

  async function getGroups() {
    await axios
      .get("/api/group")
      .then((response) => {
        const groups = response.data.value;
        const groupsReverse = groups.reverse();
        const newgroups = JSON.stringify(groupsReverse);

        localStorage.setItem("groups", newgroups);

        setGroups(groupsReverse);
        setFilteredgroups(groupsReverse);
      })
      .catch((error) => {
        if (localStorage.getItem("groups")) {
          setGroups(JSON.parse(localStorage.getItem("groups")));
          setFilteredGroups(JSON.parse(localStorage.getItem("groups")));
        }
        console.log(error.response);
      });
  }

  // async function getUsersSenseData() {
  //   await fetch("/api/sensedata/group")
  //     .then(async (response) => {
  //       const listGroups = await response.json();
  //       console.log(listGroups);
  //       localStorage.setItem("groups", JSON.stringify(listGroups));
  //       setUsersSenseData(listGroups);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // setUsersSenseData(usersSense)
  // }

  // async function filterCustomerByName(e) {
  //   if (customers && userName === "") {
  //     const searchTerm = e.target.value;
  //     const regex = new RegExp(searchTerm, "i");
  //     const customersFiltered = customers.filter((item) =>
  //       regex.test(item.name_contract)
  //     );
  //     setFilteredCustomers(customersFiltered);
  //     setFilteredCustomersByName(customersFiltered);
  //   } else if (filteredCustomersByCS && userName !== "") {
  //     const searchTerm = e.target.value;
  //     const regex = new RegExp(searchTerm, "i");
  //     const customersFiltered = filteredCustomersByCS.filter((item) =>
  //       regex.test(item.name_contract)
  //     );
  //     setFilteredCustomers(customersFiltered);
  //     setFilteredCustomersByName(customersFiltered);
  //   }
  // }

  // function filterCustomerByCS(name) {
  //   // if (customers && setFilteredCustomersByName.length === customers.length) {
  //   if (customers && name !== "") {
  //     console.log(name);
  //     const customersFiltered = customers.filter(
  //       (item) => item.cs.name === name
  //     );
  //     setFilteredCustomers(customersFiltered);
  //     setFilteredCustomersByCS(customersFiltered);
  //   } else if (customers && name === "") {
  //     setFilteredCustomers(customers);
  //     setFilteredCustomersByCS(customers);
  //   }
  //   setUserName(name);
  // }

  useEffect(() => {
    if (localStorage.getItem("groups")) {
      setGroups(JSON.parse(localStorage.getItem("groups")));
      setFilteredGroups(JSON.parse(localStorage.getItem("groups")));
    } else {
      getGroups();
    }

    // if (localStorage.getItem("usersSenseData")) {
    //   setUsersSenseData(JSON.parse(localStorage.getItem("usersSenseData")));
    // } else {
    //   getUsersSenseData();
    // }
  }, []);

  return (
    <InternalLayout>
      <Layout>
        <div className="flex justify-between">
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
        </div>
        <Grid.Container gap={2} justify="space-between">
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
                  <Row justify="space-between">
                  <Col>
                    <Text>
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
                    <Button auto color="secondary" icon={<ArrowTopRightOnSquareIcon width={18} />}>Detalhes</Button>
                    <Button auto color="warning" icon={<PencilSquareIcon width={18} />}>Editar</Button>
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
