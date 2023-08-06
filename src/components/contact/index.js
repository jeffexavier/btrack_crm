import { PlusCircleIcon, UserIcon, EnvelopeIcon, PhoneIcon, BuildingOffice2Icon, PlusIcon, PencilIcon, TrashIcon } from "@/public/icons.js";
import { Card, Input, Text, Divider, Collapse, Link, Button, Tooltip, Avatar  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import AddContactButton from "./AddContactButton.js";
import EditContactButton from "./EditContactButton.js";
import DeleteContactButton from "./DeleteContactButton.js"

export default function ContactsList({groupId}) {


  const [contactData, setContactData] = useState([])

  async function getContactsList(groupId) {
    const listContacts = await fetch(`/api/contact?id_group=${groupId}`).then((response) => {
      return response.json()
    }).catch((error) => {
      return error
    })


    const listedContacts = listContacts.value
    // console.log(listedContacts)
    setContactData(listedContacts)
  }

  useEffect(() => {
    getContactsList(groupId)
  }, [])

  function contactInput(contact) {
    return (
      <div className="flex flex-col gap-4 p-2 w-[250px]">
        <div className="flex justify-between items-center min-h-full">
          <div className="flex flex-grow gap-2 justify-start items-center min-h-full">
            <Avatar color="secondary" text={contact.name} textColor="white"/>           
            <Link> <Text b size={18}>{contact.name}</Text></Link>
          </div>
          <div className="flex justify-end">
            <EditContactButton contactData={contact} getContactsList={getContactsList} groupId={groupId}/>
          </div>
        </div>

        {contact.email.length !== 0 ? 
        <div className="flex justify-start gap-4">
          <div className="p-1">
            <EnvelopeIcon width="18px"></EnvelopeIcon>
          </div>
          <div className="flex flex-col gap-1">
            {contact.email.map((item, index) => (
            <Link href={`mailto:${item.value}`} target="_blank"><Text size={14}>{item.value}</Text></Link>
            ))}
          </div>
        </div>
        : ""
        }
        
        {contact.phone.length !== 0 ?
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

      {contact.groups.length !== 0 ?
        <div className="flex justify-start items-start gap-4">
        <div className="p-1">
          <BuildingOffice2Icon width="18px"></BuildingOffice2Icon>
        </div>
          <div className="flex flex-col gap-1">
            {contact.groups.map((item, index) => (
              <Link href={`/internal/group/${item._id}`} target="_blank"><Text size={14}>{item.name_contract}</Text></Link>                
            ))}
          </div>
        </div>
        : ""
      }

      </div>
    )
  }

  return (
    <>
    <Collapse bordered title={
      <div className="flex justify-start gap-0 items-center">
        <div>
          <Text h4>Contatos</Text>
        </div>
        {/* <div>
          <AddContactButton groupId={groupId} getContactsList={getContactsList}/>
        </div> */}
      </div>
    }>
      <div className="flex justify-start mb-4">
          <AddContactButton groupId={groupId} getContactsList={getContactsList}/>
        </div>
      {contactData.map((contact, index) => (
        <div className="flex justify-between">
          <div className="flex justify-start gap-2">
          <UserIcon color="secondary" width="18px"/>
          <Tooltip placement="rightEnd" content={contactInput(contact)}>
            <Link color="secondary" href="https://google.com" target="_blank">{contact.name}</Link>
          </Tooltip>
          </div>
            <div className="flex">
              <DeleteContactButton contactId={contact._id} getContactsList={getContactsList} groupId={groupId}/>
              <EditContactButton contactData={contact} getContactsList={getContactsList} groupId={groupId}/>
            </div>
          </div>
      ))}
      <div className="flex justify-start mt-4">
          <AddContactButton groupId={groupId} getContactsList={getContactsList}/>
        </div>
    </Collapse>
    </>
  );
}
