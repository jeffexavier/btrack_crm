
'use-client'

import ApexChart from 'react-apexcharts'

export default function RadialBarTaxResNPS({nps, npsDetractor, npsNeutral, npsPromoter, quarter, year, aptos}) {
  const options = {
    labels: ["Resposta %"],
    colors: ["#5941A9"],
    title: {
      text: "Respostas %"
    }
  }

  const series = [(Math.round(nps / aptos.length * 100))]
  
  return (
    <>
    {/* <h1>{nps} / {aptos.length}</h1> */}
      <ApexChart 
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </>
  )
}