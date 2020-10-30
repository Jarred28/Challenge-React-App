import api from '../api';

/**
 * Get all contacts with search params
 * @param {object} params - search params
 */
export const fetchContacts = (params) => {
  return api.get("/contacts", { params });
};

/**
 * Update the contact with contact id
 * @param {string} id - contact id to edit
 * @param {object} data - new contact data to update
 */
export const editContact = (id, data) => {
  return api.put(`/contacts/${id}`,  data);
};

