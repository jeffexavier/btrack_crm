import axios from "axios";
import {v4 as uuidv4} from 'uuid'
  
  export default async function postCustomerNote(customer_id, noteDescription) {
    const reqBodyCustomerNote = {
      customers_notes: [
        {
          id_legacy: uuidv4(),
          customer: {
            id: customer_id
          },
          description: noteDescription,
          created_on: new Date()
        }
      ]
    }

    await axios.post('/api/sensedata/notas', reqBodyCustomerNote, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      // console.log(response.data)
      alert('Nota criada com sucesso!')
    })
    .catch(error => {
      console.log(error)
      alert('Erro desconhecido na criação da nota!')
    })
  }