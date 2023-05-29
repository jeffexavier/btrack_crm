
'use-client'

import ApexChart from 'react-apexcharts'

export default function ChartBarNps({nps, npsDetractor, npsNeutral, npsPromoter, quarter, year}) {

  const filteredNps = nps.filter(item => item.year === year && item.quarter === quarter.quarter)
  const filteredDetractorNps = npsDetractor.filter(item => item.year === year && item.quarter === quarter.quarter)
  const filteredNeutralNps = npsNeutral.filter(item => item.year === year && item.quarter === quarter.quarter)
  const filteredPromoterNps = npsPromoter.filter(item => item.year === year && item.quarter === quarter.quarter)
  
  const options = {
    chart: {
      stacked: true,
    },
    colors: ["#cc2936", "#f9dc5c", "#01DFC2"],
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
      }
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
        text: (Math.round(((filteredPromoterNps.length - filteredDetractorNps.length) / (filteredDetractorNps.length + filteredNeutralNps.length + filteredPromoterNps.length))*100))
      },
      tickPlacement: "between",
      categories: [...quarter.months, "trimestre"],
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
          (filteredDetractorNps.filter(item => item.month === quarter.months[0])).length,
          (filteredDetractorNps.filter(item => item.month === quarter.months[1])).length,
          (filteredDetractorNps.filter(item => item.month === quarter.months[2])).length,
          (filteredDetractorNps.filter(item => item.quarter === quarter.quarter)).length
        ]
      },
      {
        name: "Neutro",
        data: [
          (filteredNeutralNps.filter(item => item.month === quarter.months[0])).length,
          (filteredNeutralNps.filter(item => item.month === quarter.months[1])).length,
          (filteredNeutralNps.filter(item => item.month === quarter.months[2])).length,
          (filteredNeutralNps.filter(item => item.quarter === quarter.quarter)).length
        ]
      },
      {
        name: "Promotor",
        data: [
          (filteredPromoterNps.filter(item => item.month === quarter.months[0])).length,
          (filteredPromoterNps.filter(item => item.month === quarter.months[1])).length,
          (filteredPromoterNps.filter(item => item.month === quarter.months[2])).length,
          (filteredPromoterNps.filter(item => item.quarter === quarter.quarter)).length
        ]
      },
    ]
  
  return (
    <ApexChart 
    options={options}
    series={series}
    type="bar"
    height={480}
  />
  )
}