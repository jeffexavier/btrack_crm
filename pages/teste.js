const customersNotes=  [
      {
        customer: {
          cnpj: "40.821.857/0001-97",
          name_contract: "1 - Boteco do jeffin",
          id: "37134"
        },
        created_on: "2023-04-16T00:00:00.000Z",
        created_by: {
          email: "jeffin22k@hotmail.com"
        },
        description: "Lorem ipsum lacinia vestibulum mi aliquam cursus adipiscing ligula, luctus habitasse tincidunt neque enim vulputate arcu, taciti neque quisque est orci mauris leo. dictumst interdum mattis vulputate ac commodo curabitur quam hendrerit praesent vel elementum, aliquet libero tincidunt litora adipiscing venenatis dolor tincidunt suspendisse a, nisi eros elit dictumst taciti nisi nam luctus morbi hac. senectus imperdiet porttitor ante ipsum donec quisque lectus, pretium praesent non integer vel maecenas, nec sociosqu leo blandit erat accumsan. felis sodales velit dui rhoncus ut eleifend rutrum donec, nam dapibus feugiat tincidunt lacus nec suscipit molestie dictum, vulputate at semper nisl netus class taciti. "
      },
      {
        customer: {
          cnpj: "40.821.857/0001-97",
          name_contract: "2 - Boteco do jeffin",
          id: "37134"
        },
        created_on: "2023-04-16T00:00:00.000Z",
        created_by: {
          email: "jeffin22k@hotmail.com"
        },
        description: "Este é um teste do jeff para conseguir desenvolver a tela de notas do sensedata"
      }
    ]

  notasTeste = customersNotes.filter(value => {
    if (value.customer.name_contract.includes("2")) {
        return value
    }
  })

  console.log(notasTeste)