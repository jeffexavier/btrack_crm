import { parseCookies } from "nookies"

import Lista from "./internal/sensedata/notas_clientes.js"

export default function Home() {
  return (
    <>
    <Lista />
    </>
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