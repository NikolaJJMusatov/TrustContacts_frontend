import type { TContact, TCreateContact } from "./types";


const API_URL = `${import.meta.env.VITE_API_ORIGIN}`;
const TOKEN = `${import.meta.env.VITE_TOKEN}`;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getContactsApi = () => 
  fetch(`${API_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => checkResponse<TContact[]>(res))
    .then((data) => {
      return data;
    });

export const updateContactApi = async (
  id: string,
  updatedData: Partial<TContact>
): Promise<TContact> => {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(updatedData),
  });
  return await checkResponse<TContact>(res);
};

export const createContactApi = async (
  createdData: TCreateContact
): Promise<TContact> => {
  const res = await fetch(`${API_URL}/contacts`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(createdData),
  });
  return await checkResponse<TContact>(res);
};

export const deleteContactApi = async (
  id: string,
): Promise<TContact> => {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'Delete',
    headers: {
      Authorization: `Bearer ${TOKEN}`
    },
  });
  return await checkResponse<TContact>(res);
};