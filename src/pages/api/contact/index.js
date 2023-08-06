import { verifyToken } from "@/src/backend/utils/token";
import {
  createContact,
  listContacts,
  updateContact,
  deleteContact,
} from "@/src/backend/services/contact.js";

export default async function contact(req, res) {
  if (req.method === "POST") {
    try {
      const createdContact = await createContact(req.body);
      res.status(201).json(createdContact);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "GET") {
    try {
      const {id, id_partner, id_group} = req.query
      const listedContacts = await listContacts(id, id_partner, id_group);
      const responseListedContacts = {
        value: listedContacts,
        count: listedContacts.length ? (listedContacts.length) : (0) 
      };
      res.status(200).json(responseListedContacts);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const updatedContact = await updateContact(id, req.body);
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedContact = await deleteContact(id);
      res.status(200).json(deletedContact);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}
