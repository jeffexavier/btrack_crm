export default function formatClassicDate(date){
  if(date === undefined || date === "" || date === null) {
    return null
  } else {
    const dateSplit = date.split('/')
    let year = dateSplit[2]
  
    if(year.length < 4 && year > 30) {
      year = '19' + year
    } else if(year.length < 4 && year <= 30) {
      year = '20' + year
    }
  
    const newDate = `${year}-${dateSplit[1]}-${dateSplit[0]}`
  
    return newDate
  }

}