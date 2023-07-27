import { ArrowTopRightOnSquareIcon } from "@/public/icons.js"
import { Button } from "@nextui-org/react"
import Link from "next/link.js"

export default function DetailGroupButton({groupId}) {
  return (
    <Link href={`/internal/group/?id=${groupId}`} target="_blank"><Button auto color="secondary" icon={<ArrowTopRightOnSquareIcon width={18} />}>Detalhes1</Button></Link>
  )
}