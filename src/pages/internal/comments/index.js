import { Button, Dropdown, Text } from "@nextui-org/react";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";

import InternalLayout from "@/src/components/InternalLayout.js";
import Layout from "@/src/components/notes/Layout.js";
import { useEffect, useState } from "react";
import { AreaComment } from "@/src/components/comment/index.js";

import { listGroup } from "@/src/backend/utils/group.js";

export default function CommentsList({userData}) {

  const [listNotes, setListNotes] = useState([])
  const [listedGroups, setListedGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')

  function onChangeSelectGroup(index) {
    setSelectedGroup(listedGroups[index])
    // getContacts(listedGroups[index]._id)
  }

  async function getListGroups() {
    const listedGroup = await listGroup()
    setListedGroups(listedGroup.value)
    console.log(listedGroup)
  }

  useEffect(() => {
    getListGroups()
  }, [])

  return (
    <InternalLayout>
      <Layout listNotes={listNotes}>
      <div className="pb-2">
        <Dropdown borderWeight={0}>
          <Dropdown.Trigger><Button bordered color="secondary">{selectedGroup.name || 'Escolha uma empresa'}</Button></Dropdown.Trigger>
          <Dropdown.Menu onAction={(e) => onChangeSelectGroup(e)}>
            {listedGroups.map((item, index) => (
              <Dropdown.Item key={index}>{item.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
        <AreaComment userData={userData} groupId={selectedGroup._id}/>
      </Layout>
    </InternalLayout>
  )
}

export async function getServerSideProps(context) {

  const cookies = parseCookies(context);
  const token = cookies.authorization;
  try {
    verifyToken(token);
    const verifiedToken = verifyToken(token);
    return {
      props: { userData: verifiedToken},
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