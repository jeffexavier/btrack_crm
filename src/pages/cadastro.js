import jwt from "jsonwebtoken";
import Link from "next/link.js";
import Router from "next/router.js";
import { useState } from "react";
import { setCookie } from "nookies";

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
      e.preventDefault();
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
    <div className="bg-eerie-black min-h-screen flex justify-center items-center align-middle">
      <form onSubmit={handleFormSubmit} className="bg-lavender p-3 flex flex-col gap-2 rounded-md">
        <input type="text" autoComplete="name" placeHolder="Nome completo" onChange={(e) => {handleFormEdit(e, 'name')}} className="p-2 rounded-md shadow-sm focus:shadow-inner"/>
        <input type="email" autoComplete="email" placeholder="E-mail" onChange={(e) => {handleFormEdit(e, 'email')}} className="p-2 rounded-md shadow-sm focus:shadow-inner"/>
        <input type="password" autoComplete="password" placeholder="Senha" onChange={(e) => {handleFormEdit(e, 'password')}} className="p-2 rounded-md shadow-sm focus:shadow-inner"/>
        {error && <p className="text-red text-sm">{error}</p> }
        <button type="submit" className="p-2 bg-rose rounded-md shadow-md text-white">Criar minha conta</button>
        <Link href="/login" className="text-eerie-black text-sm">Já possuo uma conta...</Link>
      </form>
    </div>
  )
}