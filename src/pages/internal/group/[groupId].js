import { useRouter } from "next/router.js"


export default function GroupPage() {
const router = useRouter();

  return (
    <p>Post: {router.query.groupId}</p>
  )
}