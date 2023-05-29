'use-client'

import { Button } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic.js";
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false})


export default function CandleStickChart(props) {

  const [nps, setNps] = useState([]);
  const [npsDetractor, setNpsDetractor] = useState([]);
  const [npsNeutral, setNpsNeutral] = useState([]);
  const [npsPromoter, setNpsPromoter] = useState([]);

  async function getNpsSenseData() {
    const npsResponse = await fetch(`http://localhost:3000/api/sensedata/nps/?updatedAtStart=${'2023-01-01'}&updatedAtEnd=${'2023-03-31'}`, {
      method: 'GET'
    }).then(response => {
      return response.json();
  })
    console.log(npsResponse)
    const newNps = npsResponse.nps;
    setNps(newNps);
    const newNpsDetractor = newNps.filter(item => item.nps_status === "detractor");
    const newNpsNeutral = newNps.filter(item => item.nps_status === "neutral");
    const newNpsPromoter = newNps.filter(item => item.nps_status === "promoter");
    setNpsDetractor(newNpsDetractor);
    setNpsNeutral(newNpsNeutral);
    setNpsPromoter(newNpsPromoter);
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
      tickPlacement: "between",
      categories: ["Janeiro", "Fevereiro", "Março", "Trimestre"],
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
        text: undefined
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
        data: [1, 2, 1 + 2]
      },
      {
        name: "Neutro",
        data: [5, 4, 5 + 4]
      },
      {
        name: "Promotor",
        data: [10, 2, 10 + 2]
      },
    ]

  return (
    <>
      <Button onPress={getNpsSenseData}>Testar</Button>
      <ApexChart 
        options={options}
        series={series}
        type="bar"
        height={480}
      />
    </>
  )
}