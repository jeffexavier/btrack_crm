// import { parseCookies } from "nookies";
import { useEffect, useState, useMemo } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import {
  Card,
  Collapse,
  Container,
  Link,
  Text,
  textTransforms,
  Button,
  Input,
  Dropdown,
  Table,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants.js";
import InternalLayout from "@/src/components/InternalLayout";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  QueueListIcon,
  TrashIcon,
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
        <div>
          <Table
            aria-label="Example no animated collection table"
            css={{
              height: "auto",
              minWidth: "100%",
              hoverable: true
            }}
            animated={true}
            color="secondary"
            borderWeight={0}
          >
            <Table.Header
              aria-label="Example no animated collection table"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              animated={false}
              selectionMode="multiple"
              color="secondary"
            >
              <Table.Column>EMPRESA</Table.Column>
              <Table.Column>PORTE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>FASE</Table.Column>
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
              {groups.map((item, index) => (
            <Table.Row>
              <Table.Cell><Tooltip content={item.contract_cnpj}>{item.name_contract}</Tooltip></Table.Cell>
              <Table.Cell>{item.size}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>{item.stage}</Table.Cell>
              <Table.Cell><ChurnButton groupData={item}/></Table.Cell>
              </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
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
