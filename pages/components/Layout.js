import Footer from "./Footer.js"
import Navbar from "./Navbar.js"

import Head from "next/head.js"

export default function Layout({children}) {
  return(
    <>
    <Head>
      <link rel="shortcut icon" href="/public/favicon.ico" />
      <title>Jefferson Xavier</title>
    </Head>
      <div className="flex flex-col justify-between min-h-screen">
      <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer />
      </div>
    </>
  )
}