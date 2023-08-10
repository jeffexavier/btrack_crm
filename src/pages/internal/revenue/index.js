'use-client'

import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";
import formatDateToLocaleDateString from "@/src/backend/utils/formatDateToLocaleDateString.js";
import EditRevenueButton from "@/src/components/revenue/EditRevenueButton.js";
import OpenEditRevenueModalButton from "@/src/components/revenue/OpenEditRevenueModalButton.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";
import { Button, Table, Text, Textarea, Tooltip } from "@nextui-org/react";
import { PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon } from "@/public/icons.js";

export default function RevenueList({listedRevenuess}) {

  const [listedRevenues, setListedRevenues] = useState([]);

  function changeRowColor(type) {

    let color = {}

    switch(type) {
        case "Entrada":
          color = {
            colorFlat: 'primary-flat',
            colorFlatHover: 'primary-flat-hover',
            colorFull: 'primary-full'
          }; break;
        case "Upsell":
          color = {
            colorFlat: 'success-flat',
            colorFlatHover: 'success-flat-hover',
            colorFull: 'success-full'
          }; break;
        case 'Migração':
          color = {
            colorFlat: 'secondary-flat',
            colorFlatHover: 'secondary-flat-hover',
            colorFull: 'secondary-full'
          }; break;
        case 'Downsell':
          color = {
            colorFlat: 'warning-flat',
            colorFlatHover: 'warning-flat-hover',
            colorFull: 'warning-full'
          }; break;
        case 'Churn':
          color = {
            colorFlat: 'error-flat',
            colorFlatHover: 'error-flat-hover',
            colorFull: 'error-full'
          }; break;
       }
       return color;
    }


  async function getRevenues() {
    const revenueList = await fetch('/api/revenue').then((response) => {
      return response.json()
    })
    setListedRevenues(revenueList.value)
  }


  useEffect(() => {
    getRevenues();
  }, [])


  return (
    <InternalLayout>
      <Layout>
      <div className="grid max-w-screen-2xl min-w-min">
      <div className="grid grid-cols-11 bg-[#f1f3f5] p-4 gap-2 rounded-xl">
            <Text b size={14}>Empresa</Text>
            <Text b size={14}>Porte</Text>
            <Text b size={14}>Plano</Text>
            <Text b size={14}>Tipo</Text>
            <Text b size={14}>Valor</Text>
            <Text b size={14}>Assinaturas</Text>
            <Text b size={14}>Data</Text>
            <Text b size={14}>Motivo</Text>
            <Text b size={14}>Fator</Text>
            <Text b size={14}>Descrição</Text>
            <Text b size={14}></Text>
      </div>

      <div className="grid mt-2 gap-2">
      <div className="flex justify-center hover:cursor-pointer hover:bg-opacity-30 hover:bg-black p-1 rounded-lg transition-colors ease-linear">
       <PlusIcon className="stroke-[#fff]" width="20px"/>
      </div>
      {listedRevenues.reverse().map((item, index) => (
      <div key={index} className={`grid grid-cols-11 hover:bg-[#f1f3f5] transition-colors ease-linear items-center py-1 px-4 gap-2 rounded-xl`}>
          <p className={`font-normal`}>{item.group.name_contract}</p>
          <p className={`font-normal`}>{item.group.size}</p>
          <p className={`font-normal`}>{item.plan}</p>
          <p className={`text-${changeRowColor(item.type).colorFull} font-medium`}>{item.type}</p>
          <p className={`truncate font-normal`}>{item.value}</p>
          <p className={`font-normal`}>{item.license_qty}</p>
          <p className={`font-medium`}>{formatDateToLocaleDateString(item.dt_request)}</p>
          <p className={`font-normal`}>{item.request_reason ? item.request_reason.value : ''}</p>
          <p className={`font-normal`}>{item.request_factor}</p>
          <Tooltip content={item.request_description} placement="left">
            <div className="max-w-[150px]">
              <p className={`truncate font-normal`}>{item.request_description}</p>
            </div>
          </Tooltip>
          <div>
            <div className="flex justify-end">
              <OpenEditRevenueModalButton revenueData={item} getRevenues={getRevenues} />
              <Tooltip color="error" placement="top" content="Excluir registro">
                <Button auto light color="error" icon={<TrashIcon width="18px"/>} onPress={() => console.log(changeRowColor(item.type).colorFlat)}/>
              </Tooltip>
            </div>
          </div>
      </div>
      ))}

      <div className="flex justify-center hover:cursor-pointer hover:bg-opacity-30 hover:bg-black p-1 rounded-lg transition-colors ease-linear">
       <PlusIcon className="stroke-[#fff]" width="20px"/>
      </div>

      </div>
      </div>
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
      props: { userData: verifiedToken },
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