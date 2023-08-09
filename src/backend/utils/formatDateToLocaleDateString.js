export default function formatDateToLocaleDateString(date) {
  return new Date(date).toLocaleDateString('pt-br', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}