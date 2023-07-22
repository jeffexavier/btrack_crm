export default function formatDate(date){
  const newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  if(day < 10) {
    day = '0' + day
  }

  if(month < 10) {
    month = '0' + month
  }

  return `${year}-${month}-${day}`
}
