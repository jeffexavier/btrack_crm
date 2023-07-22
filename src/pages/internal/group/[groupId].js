import { useRouter } from "next/router"
import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/sensedata/Layout.js";
export default function GroupId() {

    const router = useRouter()
    return (
        <InternalLayout>
            <Layout>
        <p>Post: {router.query.groupsId}</p>
            </Layout>
        </InternalLayout>
    )
}