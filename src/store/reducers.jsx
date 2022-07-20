import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'; 
import {
  addContact,
  filterContacts,
  deleteContact,
  getFromApi,
  postInApi,
  removeFromApi,
} from '../store/actions';

import {mockApiInstance} from '../api/client'


const initialState = {
  items: [],
  filter: '',
  status: 'idle',
};


export const fetchContacts = createAsyncThunk(getFromApi, async () => {
  const response = await mockApiInstance.get('contacts');
  return response.data;
});

export const saveContact = createAsyncThunk(postInApi, async contact => {
  const response = await mockApiInstance.post('contacts', contact);
  return response.data;
});

export const removeContact = createAsyncThunk(removeFromApi, async contactId => {
  const response = await mockApiInstance.delete(`contacts/${contactId}`);
  return response.data;
});

export const contactReducer = createReducer(initialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.items = [...state.items, action.payload];
    })

    //GET
    .addCase(fetchContacts.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = [...action.payload];
      state.status = 'idle';
    })

    //POST
    .addCase(saveContact.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(saveContact.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = 'idle';
    })

    //DELETE
    .addCase(removeContact.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(removeContact.fulfilled, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
      state.status = 'idle';
    })

    .addCase(filterContacts, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(deleteContact, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    })
    .addDefaultCase((state, action) => {});
});
