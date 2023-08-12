'use-client'

import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";
import formatDateToLocaleDateString from "@/src/backend/utils/formatDateToLocaleDateString.js";
import EditRevenueButton from "@/src/components/revenue/EditRevenueButton.js";
import OpenEditRevenueModalButton from "@/src/components/revenue/OpenEditRevenueModalButton.js";
import OpenAddRevenueModalButton from "@/src/components/revenue/OpenAddRevenueModalButton.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";
import { Button, Table, Text, Textarea, Tooltip } from "@nextui-org/react";
import { PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon } from "@/public/icons.js";

export default function RevenueList() {

  const [listedRevenues, setListedRevenues] = useState([]);

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
      <div className="flex justify-start py-4">
      <Tooltip color="secondary" content="Novo registro" >
        <Button flat auto color="secondary" size="xs" icon={<PlusIcon width="18px"/>} />
        </Tooltip>
      </div>
      <div className="grid grid-cols-12 bg-[#f1f3f5] p-4 gap-2 rounded-xl">
            <div></div>
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

      {listedRevenues.reverse().map((item, index) => (
      <div key={index} className={`grid grid-cols-12 hover:bg-[#f1f3f5] transition-colors ease-linear items-center py-1 px-4 gap-2 rounded-xl min-w-[960px]`}>
          <p className={`font-normal text-sm`}>{item.request_status}</p>
          <p className={`font-normal text-sm`}>{item.group.name_contract}</p>
          <p className={`font-normal text-sm`}>{item.group.size}</p>
          <p className={`font-normal text-sm`}>{item.plan}</p>
          <p className={`font-medium text-sm`}>{item.request_type}</p>
          <p className={`truncate font-normal text-sm`}>{item.request_value}</p>
          <p className={`font-normal text-sm`}>{item.license_qty}</p>
          <p className={`font-medium text-sm`}>{formatDateToLocaleDateString(item.dt_request)}</p>
          <p className={`font-normal text-sm`}>{item.request_reason ? item.request_reason.value : ''}</p>
          <p className={`font-normal text-sm`}>{item.request_factor}</p>
          <Tooltip content={item.request_description} placement="left">
            <div className="max-w-[150px]">
              <p className={`truncate font-normal text-sm`}>{item.request_description}</p>
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
      <div className="flex justify-center py-2">
          <OpenAddRevenueModalButton getRevenues={getRevenues}/>
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