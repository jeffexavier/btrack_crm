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

export default function Clientes({userData}) {

  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [filteredCustomersByName, setFilteredCustomersByName] = useState([])
  const [filteredCustomersByCS, setFilteredCustomersByCS] = useState([])
  const [usersSenseData, setUsersSenseData] = useState([])
  const [userName, setUserName] = useState('')

  async function getCustomers() {
    await axios.get("/api/sensedata/customers")
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
      console.log(usersSense)
      const usersCS = usersSense.users.filter(item => item.profile.role === "editor")
      localStorage.setItem('usersSenseData', JSON.stringify(usersCS))
      setUsersSenseData(usersCS)
    }).catch(error => {
      console.log(error)
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
    setUserName(name)
  }

  useEffect(() => {
    if(localStorage.getItem('customers')) {
      setCustomers(JSON.parse(localStorage.getItem('customers')))
      setFilteredCustomers(JSON.parse(localStorage.getItem('customers')))
    } else {
      getCustomers()
    }

    if(localStorage.getItem('usersSenseData')) {
      setUsersSenseData(JSON.parse(localStorage.getItem('usersSenseData')))
    } else {
      getUsersSenseData()
    }
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
          <Dropdown.Button bordered color="secondary" css={{minWidth: "180px", textAlign: "left"}}>
            {userName === "" ? "Todos" : userName}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Multiple selection actions"
            color="secondary"
            css={{display: "flex", flexDirection: "column", gap: "3px"}}
            >
            <Dropdown.Item textValue="teste" color="none" css={{padding: 0}}>
              <button
                className={`rounded-lg px-3 py-1 w-full text-left transition ease-in-out duration-1000 ${userName !== "" ? "bg-white" : "bg-lavender"} hover:bg-lavender`}
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
    <div className="flex flex-col">
      <div className="flex justify-between divide-x gap-3">
        <div className="justify-self-center place-self-center self">
          Nome da Empresa
        </div>
        <div>
          <p>CNPJ</p>
        </div>
        <div>
          <p>CS</p>
        </div>
        <div>
          <p>CSM</p>
        </div>
        <div>
          <p>Data de Cadastro</p>
        </div>
        <div>
          <p>Data Cancelamento</p>
        </div>
      </div>
      {filteredCustomers.map((item, index) => (
        <div className="flex">
          <div>
            <h>Data de Cadastro</h>
          </div>
        </div>
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
    const verifiedToken = verifyToken(token)
    return {
      props: {userData: verifiedToken}
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