
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

  const series = [(Math.round(nps.length / aptos.length))]
  
  return (
    <>
    <h1>{nps.length} / {aptos.length}</h1>
      <ApexChart 
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </>
  )
}