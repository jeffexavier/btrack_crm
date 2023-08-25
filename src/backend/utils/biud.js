export async function createTokenBiud(cnpj) {
  const newCnpj = cnpj.toString()

  const newCnpjClean = newCnpj.replace(/\D/, '')
  const newCnpjMask = newCnpjClean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  console.log(newCnpj)
  console.log(newCnpjClean)
  console.log(newCnpjMask)

  const createTokenBiud = await fetch(`/api/biud?cnpj=${newCnpjMask}`).then((response) => {
    return response.json()
  })

  return createTokenBiud
}