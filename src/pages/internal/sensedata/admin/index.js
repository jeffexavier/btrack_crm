'use-client'

import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { set } from "mongoose";
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false})
import getQuarter from "@/src/backend/utils/getQuarter.js";
import Layout from "@/src/components/sensedata/Layout.js";
import InternalLayout from "@/src/components/InternalLayout.js";

export default function CandleStickChart(props) {

  const [nps, setNps] = useState([]);
  const [npsDetractor, setNpsDetractor] = useState([]);
  const [npsNeutral, setNpsNeutral] = useState([]);
  const [npsPromoter, setNpsPromoter] = useState([]);
  const [quarter, setQuarter] = useState({quarter: getQuarter(new Date()), months: ["January", "February", "March"]})
  const [year, setYear] = useState(new Date().getFullYear().toString())

  const years = ["2022", "2023"];

  const quarterMonths = [
    {
      quarter: "First",
      months: ["January", "February", "March"],
    },
    {
      quarter: 'Second',
      months: ["April", "May", "June"],
    },
    {
      quarter: 'Third',
      months: ["July", "August", "September"],
    },
    {
      quarter: 'Fourth',
      months: ["October", "November", "December"]
    }
  ]

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
    console.log(e.target.value)
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

  const options = {
    chart: {
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 20,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
      color: [
        "#FF5964"
      ]
    },
    stroke: {
      width: 0,
      colors: ['#fff']
    },
    title: {
      text: 'NPS Trimestral'
    },
    xaxis: {
      title: {
        text: ((npsPromoter.length - npsDetractor.length) / (npsDetractor.length + npsNeutral.length + npsPromoter.length))*100
      },
      tickPlacement: "between",
      categories: [... quarter.months, "trimestre"],
      labels: 
      {
        formatter: function (val) {
          return val      
        }
      }
    },
    yaxis: {
      tickAmout: 10,
      title: {
        text: year
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  const series = [
      {
        name: "Detrator",
        data: [
          (npsDetractor.filter(item => item.month === quarter.months[0] && item.year === year)).length,
          (npsDetractor.filter(item => item.month === quarter.months[1] && item.year === year)).length,
          (npsDetractor.filter(item => item.month === quarter.months[2] && item.year === year)).length,
          (npsDetractor.filter(item => item.quarter === quarter.quarter && item.year === year)).length
        ]
      },
      {
        name: "Neutro",
        data: [
          (npsNeutral.filter(item => item.month === quarter.months[0] && item.year === year)).length,
          (npsNeutral.filter(item => item.month === quarter.months[1] && item.year === year)).length,
          (npsNeutral.filter(item => item.month === quarter.months[2] && item.year === year)).length,
          (npsNeutral.filter(item => item.quarter === quarter.quarter && item.year === year)).length
        ]
      },
      {
        name: "Promotor",
        data: [
          (npsPromoter.filter(item => item.month === quarter.months[0] && item.year === year)).length,
          (npsPromoter.filter(item => item.month === quarter.months[1] && item.year === year)).length,
          (npsPromoter.filter(item => item.month === quarter.months[2] && item.year === year)).length,
          (npsPromoter.filter(item => item.quarter === quarter.quarter && item.year === year)).length
        ]
      },
    ]

    useEffect(() => {
      if(localStorage.getItem("nps")) {
        const newNps = JSON.parse(localStorage.getItem("nps"))
        setNps(newNps)
        setNpsDetractor(newNps.filter(item => item.nps_status === "detractor"));
        setNpsNeutral(newNps.filter(item => item.nps_status === "neutral"));
        setNpsPromoter(newNps.filter(item => item.nps_status === "promoter"));
      }
      console.log(year)
    }, [])


  return (
    <InternalLayout>
    <Layout>
      <div className="flex justify-between pb-3">
        <Button id="buttonteste" onPress={getNpsSenseData} aria-label="button" color="secondary">Atualizar</Button>
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
      <ApexChart 
        options={options}
        series={series}
        type="bar"
        height={480}
      />
      </Layout>
      </InternalLayout>
  )
}