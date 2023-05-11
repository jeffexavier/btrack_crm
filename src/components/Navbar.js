import { Avatar, Button } from "@nextui-org/react";
import Router from "next/router.js";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Link from "next/link.js";

export default function NavBar() {

  // const router = Router()

  async function Logout() {
    await destroyCookie(null, 'authorization')
    Router.push('/login')
  }


  return (
    <nav className="flex justify-end items-center px-4 py-4 shadow-sm">
      <div className="flex">
        {/* <Link href="/" className="p-2 text-rebecca-purple font-medium">Ajuda</Link> */}
        <Button color="secondary" onPress={Logout} className="mx-2">Logout</Button>
      </div>
    </nav>
  )
}


export async function getServerSideProps({context}) {
 const cookies = parseCookies(context);
 const token = cookies.authorization;

 console.log(token)
  
  return {
    props: {}
  }
}