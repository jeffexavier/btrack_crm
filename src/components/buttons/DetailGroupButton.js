import { ArrowTopRightOnSquareIcon } from "@/public/icons.js"
import { Button } from "@nextui-org/react"
import Link from "next/link.js"

export default function DetailGroupButton() {
  return (
    <Link href="https://www.google.com" target="_blank"><Button auto color="secondary" icon={<ArrowTopRightOnSquareIcon width={18} />}>Detalhes1</Button></Link>
  )
}