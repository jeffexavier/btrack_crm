import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { Component, useState } from "react";
import { setCookie, parseCookies } from "nookies"
import Layout from "./Layout.js";
import Lista from "./notas_clientes.js";

export default function App() {
  const [ visible, setVisible ] = useState();
  const [customerNota, setCustomerNota] = useState({customer: "Boteco do jeffin", description: "testasdfasdfasdfasdfasdf", date: "2023-04-24"})

  setCookie(null, "testeCookie", "teste de adição de cookie", {
    maxAge: 60 * 60 * 1, // 1 hour
    path: '/'
  })

  return (
    <Layout>
      <h1>index</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  console.log('[cookies]', cookies, cookies.testeCookie);

  return {
    props: {
      msg: '[Server] Esse treco funcinou mesmo!',
      cookies: cookies
    }
  }
}