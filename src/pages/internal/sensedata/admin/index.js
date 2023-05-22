
'use-client'

import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { verifyToken } from "@/src/backend/utils/token.js";
import { quarterMonths } from "@/src/backend/utils/constants.js";
import { subDate, verifyQuarter, verifySubDate } from "@/src/backend/utils/dates.js";

import axios from "axios";
import dynamic from "next/dynamic.js";
import getQuarter from "@/src/backend/utils/getQuarter.js";
import Layout from "@/src/components/sensedata/Layout.js";
import InternalLayout from "@/src/components/InternalLayout.js";

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false});
const ChartBarNps = dynamic(() => import("@/src/components/sensedata/nps/chartBarNps.js"), {ssr: false});
const RadialBarsNps = dynamic(() => import("@/src/components/sensedata/nps/radialBarsNps.js"), {ssr: false});
const RadialBarTaxResNps = dynamic(() => import("@/src/components/sensedata/nps/radialBarTaxResNps.js"), {ssr: false});

export default function CandleStickChart() {
  const [nps, setNps] = useState([]);
  const [npsDetractor, setNpsDetractor] = useState([]);
  const [npsNeutral, setNpsNeutral] = useState([]);
  const [npsPromoter, setNpsPromoter] = useState([]);
  const [quarter, setQuarter] = useState({quarter: getQuarter(new Date()), months: ["January", "February", "March"]})
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [aptos, setAptos] = useState([])

  const filteredNps = nps.filter(item => item.year === year && item.quarter === quarter.quarter).length;
  const filteredDetractorNps = npsDetractor.filter(item => item.year === year && item.quarter === quarter.quarter).length;
  const filteredNeutralNps = npsNeutral.filter(item => item.year === year && item.quarter === quarter.quarter).length;
  const filteredPromoterNps = npsPromoter.filter(item => item.year === year && item.quarter === quarter.quarter).length;
  const filteredAptos = aptos.filter(item => item.year_dt_cancel === year && item.dt_cancel === null && verifySubDate(new Date(item.dt_register)))

  const totalNps = Math.round((filteredPromoterNps - filteredDetractorNps) / filteredNps * 100)

  const years = ["2022", "2023"];

  function onChangeInputQuarter(e) {
    const selectedQuarter = e.target.value;

    switch (selectedQuarter) {
      case "First": setQuarter(quarterMonths[0]); break;
      case "Second": setQuarter(quarterMonths[1]); break;
      case "Third": setQuarter(quarterMonths[2]); break;
      case "Fourth": setQuarter(quarterMonths[3]); break;
    }
  }

  function onChangeInputYear(e) {
    setYear(e.target.value)
  }

  async function getNpsSenseData() {
    const npsResponse = await fetch(`http://localhost:3000/api/sensedata/nps/?limit=1000`, {
      method: 'GET'
    }).then(response => {
      return response.json();
  })
    const newNps = npsResponse.nps;
    localStorage.setItem("nps", JSON.stringify(newNps));
  }

  async function getCustomers() {
    await axios.get("/api/sensedata/customers")
      .then((response) => {
        const customers = response.data.customers
        const customersReverse = customers.reverse()
        const newCustomers = JSON.stringify(customersReverse)

        localStorage.setItem("customers", newCustomers)
        // setCustomers(customersReverse)
        // setFilteredCustomers(customersReverse)
    })
      .catch(error => {
        if(localStorage.getItem("customers")) {
          // setCustomers(JSON.parse(localStorage.getItem('customers')))
          // setFilteredCustomers(JSON.parse(localStorage.getItem('customers')))
        }
        console.log(error.response)
        
      })
  }

  async function attNps() {
    getNpsSenseData();
    getCustomers()
  }

    useEffect(() => {
      if(localStorage.getItem("nps")) {
        const newNps = JSON.parse(localStorage.getItem("nps"))
        setNps(newNps)
        setNpsDetractor(newNps.filter(item => item.nps_status === "detractor"));
        setNpsNeutral(newNps.filter(item => item.nps_status === "neutral"));
        setNpsPromoter(newNps.filter(item => item.nps_status === "promoter"));
        setAptos(JSON.parse(localStorage.getItem('customers')))
      }
    }, [])


  return (
    <InternalLayout>
    <Layout>
      <div className="flex justify-between pb-3">
        <Button id="buttonteste" onPress={attNps} aria-label="button" color="secondary">Atualizar</Button>
        <div className="flex gap-2">
          <select onChange={onChangeInputYear} className="bg-lavender rounded-lg p-2 text-rebecca-purple font-semibold">
            <option>Ano</option>
            {years.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          <select onChange={onChangeInputQuarter} className="bg-lavender rounded-lg p-2 text-rebecca-purple font-semibold">
            <option>Trimestre</option>
            {quarterMonths.map((item, index) => (
              <option key={index} value={item.quarter}>{item.quarter}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex">
        <RadialBarsNps nps={nps} npsDetractor={npsDetractor} npsNeutral={npsNeutral} npsPromoter={npsPromoter} quarter={quarter} year={year}/>
        <RadialBarTaxResNps nps={nps} npsDetractor={npsDetractor} npsNeutral={npsNeutral} npsPromoter={npsPromoter} quarter={quarter} year={year} aptos={filteredAptos}/>
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="text-rebecca-purple">{totalNps}</h1>
      </div>
      </div>
        <ChartBarNps nps={nps} npsDetractor={npsDetractor} npsNeutral={npsNeutral} npsPromoter={npsPromoter} quarter={quarter} year={year}/>
      </Layout>
      </InternalLayout>
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context)
  const token = cookies.authorization
  try {
    verifyToken(token)
    const verifiedToken = verifyToken(token)
    return {
      props: {userData: verifiedToken}
    }
  } catch (err) {     
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }
}
