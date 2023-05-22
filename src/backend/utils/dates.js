import getQuarter from "./getQuarter.js";


export function subDate(date, days = 30) {
  const subDate = Number(date) - (86400000 * days);
  const newDate = new Date(subDate);
  const formatedDate = newDate.toISOString().slice(0, 10)

  return formatedDate
}

export function verifySubDate(date, actualDate = new Date(), days = 30) {
  const verifiedDate = Number(new Date(date)) <= (Number(actualDate) - (86400000 * days))
  // console.log(verifiedDate, new Date(date) )
  return verifiedDate
}

export function verifyQuarter(date, quarter) {
  const verifiedDate = getQuarter(date)
}