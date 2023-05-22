import { parseCookies } from "nookies";
import { useEffect } from "react";
import Footer from "./Footer.js";
import NavBar from "./Navbar.js";
import Sidebar from "./Sidebar.js";

import Head from "next/head.js";

export default function InteranlLayout({children}) {

  return(
    <>
      <Head>
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <title>Btrack</title>
      </Head>
        <div className="flex flex-row justify-between min-h-screen max-w-screen">
          <Sidebar/>
          <div className="flex flex-col flex-auto">
            <NavBar />
            <main className="flex-auto">{children}</main>
          </div>
      </div>
      <Footer />  
    </>
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
          destination: '/internal/dashboard'
        },
        props: {
          authorizationCookie: token
        }
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