'use-client'

import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";

export default function RevenueList({listedRevenuess}) {

  const [listedRevenues, setListedRevenues] = useState([]);
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])

  async function getRevenues() {
    const revenueList = await fetch('/api/revenue').then((response) => {
      return response.json()
    })
    console.log(revenueList.value)
  }

  async function getRevenueRequestReasons() {
    const revenueRequestReasonList = await fetch('/api/revenuerequestreason').then((response) => {
      return response.json()
    })


    setListedRevenueRequestReasons(revenueRequestReasonList.value)
  }

  useEffect(() => {
    getRevenues();
    // getRevenueRequestReasons();
  }, [])


  return (
    <InternalLayout>
      <Layout>
      <div className="grid grid-cols-3">
        {listedRevenues.map((item, index) => (
          <p>teste</p>
        ))}
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