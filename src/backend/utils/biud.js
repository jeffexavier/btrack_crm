import formatClassicDate from "@/src/backend/utils/formatClassicDate.js";
import Papa from 'papaparse'

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

function organizeCpf(cpf) {

  if(cpf === null) {
    return null
  } else {
    const cleanCpf = cpf.toString().replace(/\D/g, '');
    let newCpf = cleanCpf  
    if(cleanCpf.length < 11) {
      let i = cleanCpf.length
  
      while(i < 11) {
        newCpf = '0' + newCpf
        i = i + 1
      }
    }
    return newCpf
  }
}

export async function unparseCustomersBiud(csvData, formData, tokenBiud) {
  
  const newCsvData = csvData.slice(1, csvData.length)
  // console.log(newCsvData)

  function getCsvData(indexCsv, indexForm){
    if(formData[indexForm].value === null) {
      return null
    }
    return newCsvData[indexCsv][formData[indexForm].value]
  }     
  
  const reports = []

  const customersArray = await newCsvData.map((itemCsv, indexCsv) => {     
    const newFormData = {
        token: tokenBiud,
        cpf: organizeCpf(getCsvData(indexCsv, 0)),
        name: getCsvData(indexCsv, 1),
        email: getCsvData(indexCsv, 2),
        phone: getCsvData(indexCsv, 3).replace(/\D/g, ''),
        bornAt: formatClassicDate(getCsvData(indexCsv, 4)) || '2000-01-01',
        gender: getCsvData(indexCsv, 5),
        forceUpdateData: getCsvData(indexCsv, 6) || true
        // ,
        // address: {
        //   postal_code: getCsvData(indexCsv, 7),
        //   street: getCsvData(indexCsv, 8),
        //   district: getCsvData(indexCsv, 9),
        //   complement: getCsvData(indexCsv, 10),
        //   number: getCsvData(indexCsv, 11),
        //   city: getCsvData(indexCsv, 12),
        //   uf: getCsvData(indexCsv, 13)
        // }
      }
      return newFormData
  })
  console.log(customersArray)
  const createCustomerBiud = await fetch('/api/biud/customer', {
    method: 'POST',
    body: JSON.stringify(customersArray),
    headers :{
      'Content-Type': 'application/json'
    }
  }).then((response) => {
   return response.json()
  }).catch((error) => {
    return error
  })
//   console.log(typeof(customersArray))
console.log(createCustomerBiud)
return createCustomerBiud

}