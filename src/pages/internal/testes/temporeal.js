'use-client'

import { createElement, useEffect } from "react"


export default function TempoReal() {
  
  // useEffect(()=>{
  //   const evtSource = new EventSource('http://localhost:3000/api/testes/temporeal');
    
  //   const messageList = document.querySelector("#message");
    
  //   evtSource.onmessage = (e) => {
  //     console.log(e.data)
  //     const newElement = document.createElement('p');
  //     newElement.textContent = `messsage: ${e.data}`

  //     messageList.appendChild(newElement)
  //   };
  // }, []);

  return (
    <>
      <h1>Mensagens</h1>
      <div id="message">

      </div>
    </>
  )
}