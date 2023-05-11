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