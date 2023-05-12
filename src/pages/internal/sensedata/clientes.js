// import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import Layout from "@/src/components/sensedata/Layout.js";
import axios from "axios";
import { Card, Collapse, Container, Link, Text, textTransforms, Button } from "@nextui-org/react";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants.js";
import InternalLayout from '@/src/components/InternalLayout';

export default function Clientes() {

  async function getCustomers() {
    await axios.get("/api/sensedata/clientes")
      .then((response) => {
        const customers = response.data.customers
        const customersReverse = customers.reverse()
        const newCustomers = JSON.stringify(customersReverse)

        localStorage.setItem("customers", newCustomers)
        setCustomers(customersReverse)
        console.log(newCustomers)
    })
      .catch(error => {
        if(localStorage.getItem("customers")) {
          setCustomers(JSON.parse(localStorage.getItem('customers')))
        }
        console.log(error.response)
        
      })
  }


const [customers, setCustomers] = useState([])

  useEffect(() => {
    if(localStorage.getItem('customers')) {
      setCustomers(JSON.parse(localStorage.getItem('customers')))
    } else {
      getCustomers()
    }
  }, [])

  return (
    <InternalLayout>
    <Layout>
    <div className="flex justify-between mb-3">
    <Button disabled>Criar nova empresa</Button>
    <Button bordered auto color="secondary" onPress={() => {getCustomers()}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      </Button>
    </div>
      <div className="grid grid-cols-3 gap-3">
      {customers.map((item, index) => (
        <Card key={index} borderWeight="" variant="shadow" isHoverable css={{display:"flex", minHeight:"300px", maxHeight:"600px", overflow:"hidden"}} >
          <Card.Header css={{display:"flex", flexDirection:"column", alignItems: "start"}}>
            <Text as="a" href={"https://biud.sensedata.io/cliente/" + item.id} target="_blank" weight="bold" size="20px" color={item.dt_cancel === null ? "secondary" : "#ccc"} h4 transform="uppercase" css={{overflow:'hidden', maxHeight: "30px"}}>{item.name_contract}</Text>
            <Text p1 transform="uppercase" css={{overflow:'hidden', maxHeight: "30px"}}>{item.id_legacy}</Text>
            <Text p1 css={{overflow:'hidden', maxHeight: "30px"}}>{item.industry ? item.industry : '--'}</Text>               
          </Card.Header>
          <Card.Body>
          <Collapse.Group shadow>
          {item.custom_fields.principal_dor && item.custom_fields.principal_dor.value !== null ? (
            <Collapse css={{fontSize:"20px"}} title={<Text color="#191716" h5>Principal Dor</Text>}>
              <Text>{item.custom_fields.principal_dor.value}</Text>
            </Collapse>
          ) : (
            <Collapse disabled css={{fontSize:"20px"}} title={<Text color="#ccc" h5>Principal Dor</Text>}>
              <Text></Text>
            </Collapse>
          )}
          {item.custom_fields.erp && item.custom_fields.erp.value !== null ? (
            <Collapse css={{fontSize:"20px"}} title={<Text color="#191716" h5>ERP</Text>}>
              <Text>{item.custom_fields.erp.value}</Text>
            </Collapse>
          ) : <Collapse disabled css={{fontSize:"20px"}} title={<Text color="#ccc" h5>ERP</Text>}>
              <Text></Text>
            </Collapse>}
            {item.dt_cancel !== null ? (
            <Collapse css={{fontSize:"20px"}} title={<Text color="#191716" h5>Cancelamento</Text>}>
              <Text><Text h5>Motivo:</Text>{item.cancel_tag !== null ? item.cancel_tag : "--"}</Text>
              <Text css={{overflow:"auto"}}><Text h5>Descrição:</Text>{item.cancel_description !== null ? item.cancel_description : "--"}</Text>
            </Collapse>
          ) : <Collapse disabled css={{fontSize:"20px"}} title={<Text color="#ccc" h5>Cancelamento</Text>}>
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