import getQuarter from "../../utils/getQuarter.js"

const NPS = {
  "nps": [
    {
      "id": 43,
      "id_legacy": null,
      "customer": {
        "id": 165,
        "id_legacy": "33.454.410/0001-61",
        "group": "All Kitchens",
        "name_contract": "All Kitchens",
        "name": "All Kitchens",
        "cnpj": "33454410000161"
      },
      "form": null,
      "ref_date": "2022-11-17T00:00:00",
      "survey_date": null,
      "medium": "",
      "respondent": "",
      "score": 6,
      "role": "",
      "stage": "",
      "group": "",
      "category": "",
      "nps_status": "detractor",
      "comments": "Na questão da expectativa, o que a gente leva à efetividade junto à BIUD. A contrução de público nas redes sociais não tem uma boa segmentação, hoje se a gente tiver um bom PDV a gente consegue uma leitura semelhante à BIUD, hoje, não vejo um diferencial de mercado da BIUD sendo ofertado",
      "tags": "",
      "created_at": "2022-12-30T20:27:18.210192",
      "updated_at": null,
      "id_customer": 165
    },
    {
      "id": 44,
      "id_legacy": null,
      "customer": {
        "id": 167,
        "id_legacy": "24.661.375/0001-60",
        "group": null,
        "name_contract": "Barbearia La Firma",
        "name": "Barbearia La Firma",
        "cnpj": "24661375000160"
      },
      "form": null,
      "ref_date": "2022-11-17T00:00:00",
      "survey_date": null,
      "medium": "",
      "respondent": "",
      "score": 8,
      "role": "",
      "stage": "",
      "group": "",
      "category": "",
      "nps_status": "neutral",
      "comments": "O atendimento e suporte são ótimos porém algumas dificuldade sistêmicas na importação inicial das NFs atrasaram o andamento; além de ter que ficar fazendo a configuração e carregamento manual dos arquivos no formato correto.",
      "tags": "",
      "created_at": "2022-12-30T20:27:18.210192",
      "updated_at": null,
      "id_customer": 167
    },
    {
      "id": 45,
      "id_legacy": null,
      "customer": {
        "id": 168,
        "id_legacy": "36.321.707/0001-47",
        "group": null,
        "name_contract": "Bio Smart Food",
        "name": "Bio Smart Food",
        "cnpj": "36321707000147"
      },
      "form": null,
      "ref_date": "2022-11-17T00:00:00",
      "survey_date": null,
      "medium": "",
      "respondent": "",
      "score": 8,
      "role": "",
      "stage": "",
      "group": "",
      "category": "",
      "nps_status": "neutral",
      "comments": "Gosto muito e admiro a tecnologia com relaçao ao tratamento do CPF identificando o cliente e fazer o marketing mais assertivo que foi o que me venderam. A nota poderia ser 10 se o pacote completo de marketing tivesse sido executado que envolve criação de cardápio, panfleto, redes sociais e guerrilha. Ficou um pouco a desejar nessa questão mas eu sempre indico para vários clientes",
      "tags": "",
      "created_at": "2022-12-30T20:27:18.210192",
      "updated_at": null,
      "id_customer": 168
    },
    {
      "id": 46,
      "id_legacy": null,
      "customer": {
        "id": 169,
        "id_legacy": "27.317.610/0001-70",
        "group": null,
        "name_contract": "Blas406",
        "name": "Blas406",
        "cnpj": "27317610000170"
      },
      "form": null,
      "ref_date": "2022-11-17T00:00:00",
      "survey_date": null,
      "medium": "",
      "respondent": "",
      "score": 9,
      "role": "",
      "stage": "",
      "group": "",
      "category": "",
      "nps_status": "promoter",
      "comments": "O trabalho de vocês é um complemento do meu, eu acredito que voçês vieram para somar! Só não dou 10 pq não são todas as funções da plataforma que já estão disponíveis para mim. Uma observação: o Guilherme é um excelente profissional e muito proativo.",
      "tags": "",
      "created_at": "2022-12-30T20:27:18.210192",
      "updated_at": null,
      "id_customer": 169
    }
  ]
}

export function transformNps(nps, limit = 100, page = 1, nextPage) {
  const transformedNps = {nps:[], per_page: limit, current_page: page, count: nps.length, next_page: nextPage ? nextPage : null}  
    nps.map(item => {
      transformedNps.nps.push({
        id: item.id,
        id_legacy: item.id_legacy,
        customer: {
          id: item.customer.id,
          id_legacy: item.customer.id_legacy,
          group: item.customer.group,
          name_contract: item.customer.name_contract,
          name: item.customer.name,
          cnpj: item.customer.cnpj
        },        
        score: item.score,
        nps_status: item.nps_status,
        ref_date: item.ref_date,
        created_at: item.created_at,
        updated_at: item.updated_at,
        month: new Date(item.ref_date).toLocaleString('en-NA', {
          month: 'long'        
        }),
        year: new Date(item.ref_date).toLocaleString('en-NA', {
          year: "numeric",          
        }),
        quarter: getQuarter(item.ref_date)
      })
    })
  return transformedNps
}