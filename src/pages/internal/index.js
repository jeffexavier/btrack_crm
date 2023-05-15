import { Children } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import Lista from "./sensedata/notas_clientes.js"
import InternalLayout from '@/src/components/InternalLayout';

export default function Home({ children }) {
  return (
      <Lista />
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const token = cookies.authorization
  try {
    verifyToken(token)
    return {
        redirect: {
            permanent: false,
            destination: '/sensedata/dashboard'
        },
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