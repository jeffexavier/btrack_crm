import { Children } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import Lista from "./sensedata/notas_clientes.js"
import Group from "./group/index.js"
import InternalLayout from '@/src/components/InternalLayout';

export default function Home({ userData, children }) {
  return (
      <Group userData={userData}/>
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