import { Component } from "react";
import Layout from "./Layout.js";

export default function Index({Component, pageProps}) {
  return(
    <Layout>
    <Component {...pageProps}/>
    </Layout>
  )
}