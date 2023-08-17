// adição funções de createUser, validate User, validate token JWT, etc...

import bcrypt from "bcrypt"
import databaseConnection from "../utils/database";
import Contact from "../models/contact";

import { createToken } from "@/src/backend/utils/token";
import contact from "@/src/pages/api/contact/index.js";

export async function createContact(body) {
  await databaseConnection();
    const newContact = body
    const createNewContact = await Contact.create(newContact);

    return createNewContact
}

export async function listContacts(id, id_partner, id_group) {
  databaseConnection();

  const query = {}

  if(id) {
    query._id = id;
  }

  if(id_partner) {
  query.partners = id_partner;
  }

  if(id_group) {
    query.groups = id_group;
  }

  const listContacts = await Contact.find(query).populate('groups');
  // const listContacts = await Contact.find(query).populate({path: 'children', populate: {path: 'created_by'}});
  return listContacts;
}

export async function updateContact(id, body) {
  databaseConnection();
  if(id) {
    const contact = await Contact.findByIdAndUpdate(id, {...body, dt_update: new Date(), edited: true});
    const updatedContact = await Contact.findById(contact._id)
    return updatedContact;
  }
  const contact = await Contact.findOneAndUpdate({id_legacy}, {...body, dt_update: new Date(), edited: true});
  const updatedContact = await Contact.findById(contact._id)
  return updatedContact;
}

export async function deleteContact(id) {
  try {
    databaseConnection();
    const deleteContact = await Contact.findByIdAndDelete(id);
    const deletedContact = { ...deleteContact, status: "deleted" }  
    return deletedContact    
  } catch (error) {
    return error
  }
}