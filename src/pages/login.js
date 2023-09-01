import jwt from "jsonwebtoken";
import Link from "next/link.js";
import Router from "next/router.js";
import { useState } from "react";
import { setCookie } from "nookies";
import { Button, Checkbox, Input, Text } from "@nextui-org/react";
import { AtSymbolIcon, KeyIcon, TrashIcon } from "@/public/icons.js";

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  function handleFormEdit(e, name) {
    setError('')

    setFormData({
      ...formData,
      [name]: e.target.value
    })
  }

  async function handleFormSubmit(e) {
    try {
      if(e) {
        e.preventDefault();
      }
      const response = await fetch('/api/user/login', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", 
        }
      })

   
      const json = await response.json();
      if (response.status !== 200) throw new Error(json)

      setCookie(null, 'authorization', json, {
        maxAge: 60 * 60 * 24,
        path: '/'
      })

      Router.push('/internal/dashboard')

    } catch (error) {
      setError(error.message); 
    }
  }


  return (
    <div className="flex justify-between bg-secondary-flat min-h-full items-center align-middle">
      <div className="flex justify-center bg-red w-full">"teste"</div>
      <div className="grid gap-4 justify-center content-center w-[890px] bg-white h-screen">
        <div className="grid gap-4 w-full p-12 justify-center">
          <Text h2>Bem-vindo de volta!</Text>
          <Input bordered color="secondary" type="email" autoComplete="email" labelLeft={<AtSymbolIcon width="18px"/>}s onChange={(e) => {handleFormEdit(e, 'email')}}/>
          <Input.Password bordered color="secondary" type="password" autoComplete="password" labelLeft={<KeyIcon width="18px"/>} onChange={(e) => {handleFormEdit(e, 'password')}}/>
          {error && <p className="text-red text-sm">{error}</p> }
          <Button color="secondary" onPress={() => handleFormSubmit()}>Entrar</Button>
          {/* <Checkbox size="xs">
            Quero me manter conectado.
          </Checkbox> */}
        </div>
        <div className="flex justify-center">
          <Link href="/cadastro" className="text-secondary-full text-sm font-semibold">Quero me cadastrar...</Link>
        </div>
      </div>
    </div>
  )
}