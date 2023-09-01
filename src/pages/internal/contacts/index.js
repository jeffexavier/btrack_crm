import InternalLayout from "@/src/components/InternalLayout.js";
import { Avatar, Card, Divider, Text, User, Link, Button } from "@nextui-org/react";
import { listContacts } from "@/src/backend/utils/contact.js";
import { useEffect, useState } from "react";
import { BuildingOffice2Icon, EnvelopeIcon, PencilIcon, PhoneIcon, TrashIcon } from "@/public/icons.js";
import Layout from "@/src/components/contact/Layout.js";

export default function ContactsList() {

  const [listedContacts, setListedContacts] = useState([])
  async function getContactsList() {
    const contactsList = await listContacts()
    console.log(contactsList.value)
    setListedContacts(contactsList.value)
  }

  useEffect(() => {
    getContactsList()
  }, [])

  return (
    <InternalLayout>
    <Layout listContacts={listedContacts} getContactsList={getContactsList}>
      <div className="grid gap-4 grid-cols-3">
      {listedContacts.map((contact, index) => (
        <Card borderWeight="0">
        <Card.Header>
        <div className="grid w-full">
          <div className="flex justify-between pb-2 gap-2 items-center">
            <div className="flex justify-start gap-2 items-center">
              <Avatar text={contact.name} />
              <Text b size={18}>{contact.name}</Text>
            </div>
            <div className="flex justify-end gap-2 items-center">
              <Button light auto color="secondary">
                <PencilIcon width="18px"/>
              </Button>
              <Button light auto color="error">
                <TrashIcon width="18px"/>
              </Button>
            </div>
          </div>
          <Text h6>{contact._id}</Text>
        </div>
        </Card.Header>
        <Divider />
        <Card.Body>
        <div className="grid gap-2">
            {contact.email && contact.email.length !== 0 ? 
            <div className="flex justify-start gap-4">
              <div className="p-1">
                <EnvelopeIcon width="18px"/>
              </div>
              <div className="flex flex-col gap-1">
                {contact.email.map((item, index) => (
                <Link href={`mailto:${item.value}`} target="_blank"><Text size={14}>{item.value}</Text></Link>
                ))}
              </div>
            </div>
            : ""
            }
            
            {contact.phone && contact.phone.length !== 0 ?
            <div className="flex justify-start items-start gap-4">
            <div className="p-1">
              <PhoneIcon width="18px"></PhoneIcon>
            </div>
              <div className="flex flex-col gap-1">
                {contact.phone.map((item, index) => (
                    <Link href={`https://wa.me/${item.value}`} target="_blank"><Text size={14}>{item.value}</Text></Link>
                ))}
              </div>
            </div>
            : ""
          }

          {contact.groups && contact.groups.length !== 0 ?
            <div className="flex justify-start items-start gap-4">
            <div className="p-1">
              <BuildingOffice2Icon width="18px"></BuildingOffice2Icon>
            </div>
              <div className="flex flex-col gap-1">
                {contact.groups.map((item, index) => (
                  <Link href={`/internal/group/${item._id}`} target="_blank"><Text size={14}>{item.name}</Text></Link>                
                ))}
              </div>
            </div>
            : ""
          }
          </div>
        </Card.Body>
      </Card>
      ))}
      </div>
      </Layout>
    </InternalLayout>
  )
}