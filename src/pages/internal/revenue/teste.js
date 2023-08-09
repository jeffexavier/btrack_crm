'use-client'

import { listRevenues } from "@/src/backend/services/revenue";
import { listRevenueRequestReasons } from "@/src/backend/services/revenueRequestReason";
import InternalLayout from "@/src/components/InternalLayout";
import Layout from "@/src/components/group/Layout.js";
import { updateGroup } from "@/src/backend/utils/group.js";

import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token";
import { useEffect, useState } from "react";

export default function RevenueList() {

  const [listedRevenues, setListedRevenues] = useState([]);
  const [listedRevenueRequestReasons, setListedRevenueRequestReasons] = useState([])

  async function getRevenues() {
    const revenueList = await listRevenues();
    setListedRevenues(listRevenues)
    console.log(revenueList)
  }

  async function getRevenueRequestReasons() {
    const revenueRequestReasonList = await listRevenueRequestReasons()
    setListedRevenueRequestReasons(revenueRequestReasonList)
  }

  useEffect(() => {
    getRevenues();
    getRevenueRequestReasons();
  }, [])


  return (
    <InternalLayout>
      <Layout>
      <div className="grid grid-cols-3">
        <p>teste</p>
      </div>
      </Layout>
    </InternalLayout>
  )
}