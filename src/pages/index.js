import Lista from "./internal/sensedata/notas_clientes.js"


export default function Home() {
  return (
    <>
    <Lista />
    </>
  )
}

export async function getServerSideProps({props}) {
  return {
    redirect: {
      permanent: false,
      destination: '/internal/dashboard'
    },
    props: {}
  }
}
