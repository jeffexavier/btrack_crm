import { useRouter } from "next/router"
import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/sensedata/Layout.js";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";

export default function GroupId({groupData}) {

    const router = useRouter()

    const newGroupId = router.query.groupId

    const [formData, setFormData] = useState(groupData)

    async function getGroup(_id) {
        // const getGroupData = await fetch(`/api/group?id=${_id}`).then(response => {
        // return response.json()
        // })
        // const newGroupData = getGroupData
        // console.log(newGroupData.value)
        // setFormData(newGroupData.value)

        // console.log(_id)
        // console.log(router.query.groupId)
      }

      useEffect(() => {
        // console.log(newGroupId)
      }, [])


    return (
        <InternalLayout>
            <Layout>
        <p>Post: {groupData.name_contract}</p>
        <div>
            <div>
                <Input type="text" label="ID" initialValue={groupData._id}/>
            </div>
            <div>

            </div>
        </div>
            </Layout>
        </InternalLayout>
    )
}

export async function getServerSideProps(context) {
    const {groupId} = context.query

    const listGroup = await fetch(`http://localhost:3000/api/group?id=${groupId}`).then((response) => {
        return response.json()
    })

    const cookies = parseCookies(context);
    const token = cookies.authorization;
    try {
      verifyToken(token);
      const verifiedToken = verifyToken(token);
      return {
        props: { userData: verifiedToken, groupData: listGroup.value },
      };
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }