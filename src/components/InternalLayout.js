import { parseCookies } from "nookies";
import { useEffect } from "react";
import Footer from "./Footer.js";
import NavBar from "./Navbar.js";
import Sidebar from "./Sidebar.js";

import Head from "next/head.js";

// function loadWidget(){
//   var url = 'https://biud.becon.com.br/wserver/widget/widget.js#/'
//   var s = document.createElement('script');
//   s.charset = 'UTF-8'
//   s.type = 'text/javascript';
//   s.async = true;
//   s.src = url;
//   var options = {
// "enabled":true,
// "chatButtonSetting":{
//     "backgroundColor":"#D4206C",
//     "ctaText":"",
//     "borderRadius":"50",
//     "marginLeft":"50",
//     "marginBottom":"50",
//     "marginRight":"50",
//     "position":"right"
// },
// "brandSetting":{
//     "brandName":"Becon",
//     "brandSubTitle":"Transformação Digital para o seu negócio!",
//     "brandImg":"https://biud.becon.com.br/wserver/avatar/?companyId=cc2f09e8-eede-463f-bcd0-c8e77eff45bc&imageId=18ce0d43-8011-4e15-89b3-aa2436b3bfb4",
//     "welcomeText":"Olá, visitante!\nComo podemos ajudar?",
//     "messageText":"Olá, Becon\nGostaria de saber mais sobre a API oficial do WhatsApp!",
//     "backgroundColor":"#21065C",
//     "ctaText":"Falar com  Becon",
//     "borderRadius":"50",
//     "autoShow":false,
//     "phoneNumber":"556198800590",
//     "fbPixelNumber":""
// }
// };
//   s.onload = function() {
//       CreateWhatsappChatWidget(options);
//   };
//   var x = document.getElementsByTagName('script')[0];
//   x.parentNode.insertBefore(s, x);
// }

export default function InteranlLayout({children}) {

useEffect(() => {
  // loadWidget();
}, [])

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

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const token = cookies.authorization
  try {
    verifyToken(token)
      return {
        redirect: {
          permanent: false,
          destination: '/internal/dashboard'
        },
        props: {
          authorizationCookie: token
        }
      }    
  } catch (err) {     
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }
}