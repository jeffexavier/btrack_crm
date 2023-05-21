export default function getQuarter(date) {
  const newDate = new Date(date).toLocaleString("pt-BR", {
    month: "2-digit"
  })

  switch (newDate) {
    case "01": return "First";    case "02": return "First";    case "03": return "First";    case "04": return "Second";    case "05": return "Second";    case "06": return "Second";    case "07": return "Third";    case "08": return "Third";    case "09": return "Third";    case "10": return "Fourth";    case "11": return "Fourth";    case "12": return "Fourth";  }
}