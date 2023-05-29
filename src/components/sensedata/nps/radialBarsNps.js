
'use-client'

import ApexChart from 'react-apexcharts'

export default function RadialBarsNps({nps, npsDetractor, npsNeutral, npsPromoter, quarter, year}) {

  const filteredNps = (nps.filter(item => item.year === year && item.quarter === quarter.quarter)).length
  const filteredDetractorNps = (npsDetractor.filter(item => item.year === year && item.quarter === quarter.quarter)).length
  const filteredNeutralNps = (npsNeutral.filter(item => item.year === year && item.quarter === quarter.quarter)).length
  const filteredPromoterNps = (npsPromoter.filter(item => item.year === year && item.quarter === quarter.quarter)).length


  const options = {
    labels: ["Detrator", "Neutro", "Promotor", "Total"],
    colors: ["#cc2936", "#f9dc5c", "#01DFC2", "#5941A9"],
    title: {
      text: "NPS %"
    }
  }

  const series = [Math.round(filteredDetractorNps/filteredNps*100), Math.round(filteredNeutralNps/filteredNps*100), Math.round(filteredPromoterNps/filteredNps*100), Math.round(filteredNps/filteredNps*100)]
  
  return (
    <>
      <ApexChart 
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </>
  )
}