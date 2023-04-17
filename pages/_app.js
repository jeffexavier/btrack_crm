import '@/styles/globals.css'
// import Lista from "./_lista.js"
// import Menu from './_menu.js'
// import { Router, Routes, Route } from 'next/router.js'
// import Link from 'next/link.js'
import Layout from './components/Layout.js'


export default function MyApp({ Component, pageProps }) {
  return(
    <>
    <Layout>
      <Component {...pageProps} />
    </Layout>  
    </>
  )
}
