export default function getQuarter(date) {
  const newDate = new Date(date).toLocaleString("pt-BR", {
    month: "2-digit"
  })

  switch (newDate) {
    case "01": return "first";    case "02": return "first";    case "03": return "first";    case "04": return "second";    case "05": return "second";    case "06": return "second";    case "07": return "third";    case "08": return "third";    case "09": return "third";    case "10": return "fourth";    case "11": return "fourth";    case "12": return "fourth";  }
}