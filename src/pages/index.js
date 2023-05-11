import { parseCookies } from "nookies"
import { verifyToken } from "@/src/backend/services/user"

import Lista from "./internal/sensedata/notas_clientes.js"
import InternalLayout from '@/src/components/InternalLayout';

export default function Home() {
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