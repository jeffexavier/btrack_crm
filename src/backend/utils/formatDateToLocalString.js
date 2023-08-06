export default function formatDateToLocaleString(date) {
  return new Date(date).toLocaleDateString('pt-br', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}