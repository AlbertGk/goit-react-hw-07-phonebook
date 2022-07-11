import { createReducer } from '@reduxjs/toolkit';
import {
  addContact,
  filterContacts,
  deleteContact,
  addFromLocalStorage,
} from '../store/actions';

const initialState = {
  items: [],
  filter: '',
};

export const contactReducer = createReducer(initialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.items = [...state.items, action.payload];
    })
    .addCase(addFromLocalStorage, (state, action) => {
      state.items = [...state.items, ...action.payload];
    })
    .addCase(filterContacts, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(deleteContact, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    })
  .addDefaultCase((state, action) => {})
});
