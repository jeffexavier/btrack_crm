const bodyNota =  {
  customers_notes: [
    {
      id_legacy: "N12345",
      customer: {
        id: 37134
      },
      description: "Cliente interessado em up-sell.",
      created_on: "2023-04-26T23:24:00"
    }
  ]
}

console.log(JSON.stringify(bodyNota))