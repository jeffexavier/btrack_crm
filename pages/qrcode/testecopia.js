import { useRef, useState } from "react"
import { Button, Image } from "@nextui-org/react"
import html2canvas from 'html2canvas'

export default function Imagem() {

  const imageRef = useRef(null);
  const [canvas, setCanvas] = useState()

  const handleCopyImage = async () => {
    const image = imageRef.current;
    console.log(image)
    if (image) {
      const canvas = await html2canvas(image);
      setCanvas(canvas)
      console.log(canvas)
      canvas.toBlob((blob) => {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      });
    }
    console.log(image)
  };

  return (
    <>
      <Image
        ref={imageRef}
        src={"https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=www.google.com.br"}
        alt="QR Code"
        width={150}
        height={150}
      />
      <Button onPress={handleCopyImage}>Copiar</Button>
      <canvas width="150" height="150">
        <img
          src="http://localhost:3000/images/background.jpg"
       />
      </canvas>
    </>
  )
}
