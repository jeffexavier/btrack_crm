 import {useState } from "react";
// import Layout from "./Layout.js";
import { Input, Container, Card, Text } from "@nextui-org/react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@/public/icons/MagnifyingGlassIcon.js";

export default function Index() {

// Lista as primeiras 9 músicas encontradas com a parte da letra informada 
async function getMusicas(letra) {
  await axios.get(`https://api.vagalume.com.br/search.excerpt?q=${letra}&limit=9&api-key=8329defb005cafb3187279080c5f7aeb`)
  .then((response) => {
    console.log(response.data.response.docs)
    setMusicas(response.data.response.docs)
    localStorage.setItem('letras_musicas', JSON.stringify(response.data.response.docs))
  })
  .catch((error) => {
    if(localStorage.getItem('letras_musicas')) {
      setMusicas(localStorage.getItem('letras_musicas'))
    }
  })
}

const [musicas, setMusicas] = useState([])

  return (
    <div className="p-5">
      <Input
        underlined
        placeholder="Trecho da música..."
        autoComplete="true"
        contentRight={<MagnifyingGlassIcon />}
        onChange={(e) => (e.target.value).length % 3 === 0 ? getMusicas(e.target.value) : ''} // garante que a chamada da função seja executada apenas com valores de índice 3.
       />
       <div className="grid grid-cols-1 gap-3 pt-5 md:grid-cols-2 lg:grid-cols-3">
       {musicas.map((item, index) => (
        <Card key={index} as="a" isHoverable isPressable borderWeight="" href={"https://www.vagalume.com.br" + item.url} target="_blank">
          <Card.Header css={{display: "flex", flexDirection: "column", alignItems:"start", textAlign: "left"}}>
            <Text h4 color="secondary" css={{overflow: "hidden", maxHeight:"30px"}}>{item.title}</Text>
            <Text p>{item.band}</Text>
          </Card.Header>
        </Card>
       ))}
       </div>
    </div>
  )
}