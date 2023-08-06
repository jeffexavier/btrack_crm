import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";
import { useEffect, useState } from "react";
import { Input, Card, Text, Container, Row, Col, Textarea, Button, Divider } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import formatDate from "@/src/backend/utils/formatDate.js";
import { updateGroup } from "@/src/backend/utils/group.js";
import { AreaComment } from "@/src/components/comment/index.js";
import EditGroup from "@/src/components/group/EditGroup.js";
import ContactsList from "@/src/components/contact/index.js";


export default function GroupId({userData, listedGroups}) {

  console.log(userData)

  const [groupData, setGroupData] = useState(listedGroups)
  return (
    <InternalLayout>
      <Layout>
        <div className="flex justify-around gap-4">
          <div className="grid gap-4 place-content-start">
            <EditGroup groupData={groupData} />
            <ContactsList groupId={groupData._id} />
          </div>
          <Card variant="bordered">
            <Card.Header><Text h4>Comentários</Text></Card.Header>
            <Card.Body><AreaComment groupId={groupData._id} userData={userData}/></Card.Body>
          </Card>

        </div>
      </Layout>
    </InternalLayout>
  );
}

export async function getServerSideProps(context) {
    const {groupId} = context.query

    const listGroup = await fetch(`${process.env.APP_URL}/api/group?id=${groupId}`).then((response) => {
        return response.json()
    })

    const cookies = parseCookies(context);
    const token = cookies.authorization;
    try {
      verifyToken(token);
      const verifiedToken = verifyToken(token);
      return {
        props: { userData: verifiedToken, listedGroups: listGroup.value },
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