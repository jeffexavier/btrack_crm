// import { parseCookies } from "nookies";
import { useEffect, useState, useMemo } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import Layout from "@/src/components/sensedata/Layout.js";
import axios from "axios";
import { Card, Collapse, Container, Link, Text, textTransforms, Button, Input, Dropdown } from "@nextui-org/react";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants.js";
import InternalLayout from '@/src/components/InternalLayout';
import { MagnifyingGlassIcon, ArrowPathIcon, QueueListIcon } from "@/public/icons";
import ModalListNotes from "@/src/components/sensedata/modalListNotes.js";

export default function Clientes() {

  async function getCustomers() {
    await axios.get("/api/sensedata/clientes")
      .then((response) => {
        const customers = response.data.customers
        const customersReverse = customers.reverse()
        const newCustomers = JSON.stringify(customersReverse)

        localStorage.setItem("customers", newCustomers)

        setCustomers(customersReverse)
        setFilteredCustomers(customersReverse)
    })
      .catch(error => {
        if(localStorage.getItem("customers")) {
          setCustomers(JSON.parse(localStorage.getItem('customers')))
          setFilteredCustomers(JSON.parse(localStorage.getItem('customers')))
        }
        console.log(error.response)
        
      })
  }

  async function getUsersSenseData() {
    await fetch('/api/sensedata/users')
    .then(async (response) => {
      const usersSense = await response.json()
      const usersCS = usersSense.users.filter(item => item.profile.role === "editor")
      setUsersSenseData(usersCS)
    })
    // setUsersSenseData(usersSense)
  }

  async function filterCustomerByName(e) {
    if (customers && userName === "") {
      const searchTerm = e.target.value
      const regex = new RegExp(searchTerm, 'i')
      const customersFiltered = customers.filter(item => regex.test(item.name_contract))
      setFilteredCustomers(customersFiltered)
      setFilteredCustomersByName(customersFiltered)
    } else if(filteredCustomersByCS && userName !== "") {
      const searchTerm = e.target.value
      const regex = new RegExp(searchTerm, 'i')
      const customersFiltered = filteredCustomersByCS.filter(item => regex.test(item.name_contract))
      setFilteredCustomers(customersFiltered)
      setFilteredCustomersByName(customersFiltered)
    }
  }

  function filterCustomerByCS(name) {
    // if (customers && setFilteredCustomersByName.length === customers.length) {
      if (customers && name !== "") {
        console.log(name)
        const customersFiltered = customers.filter(item => item.cs.name === name)
        setFilteredCustomers(customersFiltered)
        setFilteredCustomersByCS(customersFiltered)
      } else if (customers && name === "") {
        setFilteredCustomers(customers)
        setFilteredCustomersByCS(customers)
      }
    // } else {
    //   if (customers && name !== "") {
    //     const customersFiltered = filteredCustomersByName.filter(item => item.cs.name === name)
    //     setFilteredCustomers(customersFiltered)
    //     setFilteredCustomersByCS(customersFiltered)
    //   } else if (customers && name === "") {
    //     setFilteredCustomers(filteredCustomersByName)
    //     setFilteredCustomersByCS(filteredCustomersByName)
    //   }
    // }

    setUserName(name)
  }


  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  // const [filteredCustomersByName, setFilteredCustomersByName] = useState([])
  const [filteredCustomersByCS, setFilteredCustomersByCS] = useState([])
  const [usersSenseData, setUsersSenseData] = useState([])
  const [userName, setUserName] = useState('')


  useEffect(() => {
    if(localStorage.getItem('customers')) {
      setCustomers(JSON.parse(localStorage.getItem('customers')))
      setFilteredCustomers(JSON.parse(localStorage.getItem('customers')))
    } else {
      getCustomers()
    }

    getUsersSenseData()
  }, [])

  return (
    <InternalLayout>
    <Layout>
    <div className="flex justify-between">
      <div className="flex justify-start mb-3 gap-3">
      {/* <Button disabled>Criar nova empresa</Button> */}
        <Input
          onChange={filterCustomerByName}
          clearable
          bordered
          color="secondary"
          placeholder="Search..."
          contentRight={<MagnifyingGlassIcon height="16px"/>}
          aria-hidden></Input>
        <Dropdown borderWeight="" shadow >
          <Dropdown.Button bordered color="secondary">
            CS Responsável
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Multiple selection actions"
            color="secondary"
            css={{display: "flex", flexDirection: "column", gap: "3px"}}
            >
            <Dropdown.Item textValue="teste" color="none" css={{padding: 0}}>
              <button
                className={`rounded-lg px-3 py-1 w-full text-left transition ease-in-out duration-1000 ${userName !== "Todos" ? "bg-white" : "bg-lavender"} hover:bg-lavender`}
                onClick={() => filterCustomerByCS("")}>
                Todos
              </button>
            </Dropdown.Item>
          {usersSenseData.map((item, index) => (
            <Dropdown.Item key={index} textValue="teste" color="none" css={{padding: 0}}>
              <button
                className={`rounded-lg px-3 py-1 w-full text-left transition ease-in-out duration-1000 ${item.name !== userName ? "bg-white" : "bg-lavender"} hover:bg-lavender`}
                onClick={() => filterCustomerByCS(item.name)}>
                {item.name}
              </button>
            </Dropdown.Item>
          ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Button bordered auto color="secondary" onPress={() => {getCustomers()}} css={{gridColumn: 4}}>
        <ArrowPathIcon height="24px"/>
      </Button>
    </div>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredCustomers.map((item, index) => (
        <Card key={index} borderWeight="" variant="shadow" isHoverable css={{display:"flex", minHeight:"300px", maxHeight:"600px", overflow:"hidden"}} >
          <Card.Header css={{display:"flex"}}>
            <div className="flex flex-col items-start">
            <Text as="a" href={"https://biud.sensedata.io/cliente/" + item.id} target="_blank" weight="bold" size="20px" color={item.dt_cancel === null ? "secondary" : "#ccc"} h4 transform="uppercase" css={{overflow:'hidden', maxHeight: "30px", maxWidth: "auto"}}>{item.name_contract}</Text>
            <Text transform="uppercase" css={{overflow:'hidden', maxHeight: "30px"}}>{item.id_legacy}</Text>
            <Text css={{overflow:'hidden', maxHeight: "30px"}}>{item.industry ? item.industry : '--'}</Text>
            </div>
            <ModalListNotes customerId={item.id} customerName={item.name_contract} customerObject={item}/>           
          </Card.Header>
          <Card.Body>
          <Collapse.Group shadow>
          {item.custom_fields.principal_dor && item.custom_fields.principal_dor.value !== null ? (
            <Collapse css={{fontSize:"20px"}} title={<Text color="#191716">Principal Dor</Text>}>
              <Text>{item.custom_fields.principal_dor.value}</Text>
            </Collapse>
          ) : (
            <Collapse disabled css={{fontSize:"20px"}} title={<Text color="#ccc">Principal Dor</Text>}>
              <Text></Text>
            </Collapse>
          )}
          {item.custom_fields.erp && item.custom_fields.erp.value !== null ? (
            <Collapse css={{fontSize:"20px"}} title={<Text color="#191716" h>ERP</Text>}>
              <Text>{item.custom_fields.erp.value}</Text>
            </Collapse>
          ) : <Collapse disabled css={{fontSize:"20px"}} title={<Text color="#ccc" h>ERP</Text>}>
              <Text></Text>
            </Collapse>}
            {item.dt_cancel !== null ? (
            <Collapse css={{fontSize:"20px"}} title={<Text color="#191716" h>Cancelamento</Text>}>
              <Text><b>Motivo:</b><br />{item.cancel_tag !== null ? item.cancel_tag : "--"}</Text>
              <Text css={{overflow:"auto"}}><b>Descrição:</b><br />{item.cancel_description !== null ? item.cancel_description : "--"}</Text>
            </Collapse>
          ) : <Collapse disabled css={{fontSize:"20px"}} title={<Text color="#ccc" h>Cancelamento</Text>}>
              <Text></Text>
            </Collapse>}
          </Collapse.Group>
          </Card.Body>
          <Card.Footer css={{display: "flex", justifyContent: "space-between"}}>
            <Text>{
              new Date(item.dt_register).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              })
            }{item.dt_cancel !== null ? `- ${new Date(item.dt_cancel).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              })}`
               : ""
            }</Text>
            <Text css={{textAlign:"end"}}>{item.cs.name}</Text>
          </Card.Footer>
        </Card>
      ))}
      </div>   
    </Layout>
    </InternalLayout>
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const token = cookies.authorization
  try {
    verifyToken(token)
    return {
      props: {}
    }
  } catch (err) {     
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }
}