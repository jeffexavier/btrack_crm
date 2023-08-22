'use-client'

import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/revenue/Layout.js";
import formatDateToLocaleDateString from "@/src/backend/utils/formatDateToLocaleDateString.js";

import RevenueModal from "@/src/components/revenue/RevenueModal.js";
import { DeleteRevenueButton } from "@/src/components/revenue/DeleteRevenueButton.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";
import { Button, Text, Tooltip } from "@nextui-org/react";
import { MinusIcon, PlusIcon, TrashIcon } from "@/public/icons.js";

export default function RevenueList() {

  const [listedRevenues, setListedRevenues] = useState([]);

  async function getRevenues() {
    const revenueList = await fetch('/api/revenue').then((response) => {
      return response.json()
    })
    setListedRevenues(revenueList.value)
    console.log(revenueList.value)
  }


  useEffect(() => {
    getRevenues();
  }, [])

  function itemColor(status) {
    if(status === "won") {
      return {
        bg_flat: "bg-success-flat",
        bg_hover: "hover:bg-success-flat-hover",
        text_full: "text-success-full"
      }
    } else {
      return {
        bg_flat: "bg-error-flat",
        bg_hover: "hover:bg-error-flat-hover",
        text_full: "text-error-full"
      }
    }
  }


  return (
    <InternalLayout>
      <Layout getRevenues={getRevenues} listedRevenues={listedRevenues}>
      <div className="grid max-w-screen-2xl min-w-min">
        <div className="grid grid-cols-12 bg-[#f1f3f5] p-4 gap-2 rounded-xl">
          <div className="max-w-[20px]" />
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
          <div key={index} className={`grid grid-cols-12 ${itemColor(item.request_status).bg_flat} ${itemColor(item.request_status).bg_hover} transition-colors ease-linear items-center py-1 px-4 gap-2 rounded-xl min-w-[960px]`}>
            <div className="max-w-[10px]">
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_status === "won" ? <PlusIcon width="18px"/> : <MinusIcon width="18px" />}</p>
            </div>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.group ? item.group.name : ""}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.group ? item.group.size : ""}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_type === "Migração" ? `${item.last_plan} > ${item.plan}` : item.plan}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_type}</p>
              <p className={`truncate ${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_value}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.license_qty}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{formatDateToLocaleDateString(item.dt_request)}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_reason ? item.request_reason.value : ''}</p>
              <p className={`${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_factor}</p>
              <div>
                <Tooltip content={item.request_description} placement="left">
                  <p className={`truncate ${itemColor(item.request_status).text_full} font-medium text-sm`}>{item.request_description}</p>
                </Tooltip>
              </div>
              <div>
                <div className="flex justify-end">
                  <RevenueModal revenueData={item} getRevenues={getRevenues} />
                  <DeleteRevenueButton revenueData={item} getRevenues={getRevenues}/>
                </div>
              </div>
          </div>
          ))}
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