import { useRef, useState } from "react"
import { Button, Image } from "@nextui-org/react"

export default function Imagem() {

  const imageRef = useRef(null);

  async function downloadImage(url, name) {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobURL;
    link.download = name;
    link.click();
  }

  async function copyImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobArray = [new ClipboardItem({ 'image/png': blob })];

    navigator.clipboard.write(blobArray).then(() => {
      console.log("Imagem QR Code copiada!");
    })
  }

  return (
    <>
      <Image
        ref={imageRef}
        src={"https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=www.google.com.br"}
        alt="QR Code"
        width={150}
        height={150}
      />
      <button onClick={() => {downloadImage("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=www.google.com.br", "qrcodeinstagramcom")}} className="bg-french-violet py-2 px-5 text-white font-bold
       shadow-lg shadow-french-violet rounded-lg">Download</button>
            <button onClick={() => {copyImage("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=www.google.com.br")}} className="bg-french-violet py-2 px-5 text-white font-bold
       shadow-lg shadow-french-violet rounded-lg">Copiar</button>
    </>
  )
}
