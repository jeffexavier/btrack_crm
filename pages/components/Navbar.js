import Image from "next/image.js";
import Link from "next/link.js";

export default function Navbar() {
  return (
    <nav className="flex justify-end bg-eerie-black min-h-max">
      <div className="flex justify-end">
          <a href="/" className="flex-auto button">HOME</a>
          <a href="/about" className="flex-auto button">SOBRE</a>
          <a href="/_lista2" className="flex-auto button">SENSEDATA</a>
          </div>  
    </nav>
  )
}