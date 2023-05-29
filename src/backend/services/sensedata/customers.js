
import getQuarter from "../../utils/getQuarter.js";

export function transformCustomers(customers, limit = 100, page = 1, nextPage) {

  const transformedCustomers = {customers: [], per_page: limit, current_page: page, count: customers.length, next_page: nextPage};

  customers.map(item => {
    transformedCustomers.customers.push({
      id: item.id,
      id_legacy: item.id_legacy,
      group: item.group,
      name_contract: item.name_contract,
      name: item.name,
      cnpj: item.cnpj,
      status: item.status,
      state: item.state,
      city: item.city,
      size: item.size,
      stage: item.stage,
      dt_stage: item.stage,
      dt_register: item.dt_register,
      year_dt_register: String(new Date(item.dt_register).getFullYear()),
      quarter_dt_register: getQuarter(item.dt_register),
      industry: item.industry,
      salesperson: item.salesperson,
      cs: item.cs,
      csm: item.csm,
      sponsor: item.sponsor,
      sponsor_phone: item.sponsor_phone,
      sponsor_email: item.sponsor_email,
      dt_cancel: item.dt_cancel,
      quarter_dt_cancel: getQuarter(item.dt_cancel),
      year_dt_cancel: String(new Date(item.dt_cancel).getFullYear()),
      cancel_tag: item.cancel_tag,
      cancel_description: item.description,
      badge: item.badge,
      created_at: item.created_at,
      quarter_created_at: getQuarter(item.created_at),
      year_created_at: String(new Date(item.created_at).getFullYear()),
      updated_at: item.updated_at,
      quarter_updated_at: getQuarter(item.updated_at),
      year_updated_at: String(new Date(item.updated_at).getFullYear()),
      country: item.country,
      address: item.address,
      address_number: item.address_number,
      custom_fields: item.custom_fields
    });
  });

  return transformedCustomers
}
