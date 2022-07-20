import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/add');
export const deleteContact = createAction('contacts/delete');
export const filterContacts = createAction('contacts/filter');
export const getFromApi = createAction('contacts/getFromApi');
export const postInApi = createAction('contacts/postInApi');
export const removeFromApi = createAction('contacts/removeFromApi');

