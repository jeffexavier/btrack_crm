import jwt from "jsonwebtoken";
import Link from "next/link.js";
import Router from "next/router.js";
import { useState } from "react";
import { setCookie } from "nookies";
import { Button, Checkbox, Input, Text } from "@nextui-org/react";
import { AtSymbolIcon, KeyIcon, TrashIcon, UserIcon } from "@/public/icons.js";
import bgImg from "@/public/images/bg-login.jpg"
import Image from "next/image.js";

export default function Cadastro() {

  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('/api/user/register', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", 
        }
      })

      const json = await response.json();
      
      if(response.status !== 201) {
        throw new Error(json)
      }

      setCookie(null, 'authorization', json, {
        maxAge: 60 * 60 * 24,
        path: '/'
      })

      Router.push('/internal/dashboard')

    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  }


  return (
    <div className="flex justify-between min-h-full items-center align-middle">
      {/* <form onSubmit={handleFormSubmit} className="bg-lavender p-3 flex flex-col gap-2 rounded-md">
        <input type="text" autoComplete="name" placeHolder="Nome completo" onChange={(e) => {handleFormEdit(e, 'name')}} className="p-2 rounded-md shadow-sm focus:shadow-inner"/>
        <input type="email" autoComplete="email" placeholder="E-mail" onChange={(e) => {handleFormEdit(e, 'email')}} className="p-2 rounded-md shadow-sm focus:shadow-inner"/>
        <input type="password" autoComplete="password" placeholder="Senha" onChange={(e) => {handleFormEdit(e, 'password')}} className="p-2 rounded-md shadow-sm focus:shadow-inner"/>
        {error && <p className="text-red text-sm">{error}</p> }
        <button type="submit" className="p-2 bg-rose rounded-md shadow-md text-white">Criar minha conta</button>
        <Link href="/login" className="text-eerie-black text-sm">Já possuo uma conta...</Link>
      </form> */}
      <div className="overflow-hidden w-[100vw]">
      <Image src={bgImg} style={{objectFit: 'cover', height: '100vh'}} quality={10}/>
    </div>
      <div className="grid gap-4 justify-center content-center w-[890px] bg-[f1f1f1] h-screen">
        <div className="grid gap-4 w-25 p-12 justify-center text-center">
          <Text h2>Crie sua conta.
            <Text>É grátis até que eu mude de ideia!</Text>
          </Text>
          
          <Input bordered color="secondary" type="text" autoComplete="name" labelLeft={<UserIcon width="18px" />} placeholder="Nome completo" onChange={(e) => {handleFormEdit(e, 'name')}}/>
          <Input bordered color="secondary" type="email" autoComplete="email" labelLeft={<AtSymbolIcon width="18px"/>} placeholder="E-mail" onChange={(e) => {handleFormEdit(e, 'email')}}/>
          <Input.Password bordered color="secondary" type="password" autoComplete="password" labelLeft={<KeyIcon width="18px"/>} placeholder="Senha" onChange={(e) => {handleFormEdit(e, 'password')}}/>
          {error && <p className="text-red text-sm">{error}</p> }
          <Button color="secondary" onPress={() => handleFormSubmit()}>Criar minha conta</Button>
          {/* <Checkbox size="xs">
            Quero me manter conectado.
          </Checkbox> */}
        </div>
        <div className="flex justify-center">
          <Link href="/login" className="text-secondary-full text-sm font-semibold">Já possuo uma conta...</Link>
        </div>
      </div>
    </div>
  )
}