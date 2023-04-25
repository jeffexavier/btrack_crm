import { useEffect, useState } from "react"
import Layout from "./Layout.js"

export default function botaoLocal() {

  function setStorage() {
      setLocalData(localStorage.getItem('dataLocal'))
  }

  const [localdata, setLocalData] = useState('')
  function setlocal() {
    localStorage.setItem('dataLocal', 'mude isso aqui MAIS UMA VEZ de novo outra vez again aaaaaaa bbbbbbbbbbbbb')
    setStorage()
  }

  useEffect(() => {
    if(localStorage.getItem('dataLocal')) {
      setStorage()
    }
  }, [])


  return (
    <>
      <Layout>
      <button onClick={setlocal}>teste</button>
      <h1>{localdata}</h1>
      </Layout>
    </>
  )
}