import Footer from "./Footer.js"
import NavBar from "./Navbar.js"
import Sidebar from "./Sidebar.js"

import Head from "next/head.js"

export default function Layout({children}) {
  return(
    <>
      <Head>
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <title>Jefferson Xavier</title>
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