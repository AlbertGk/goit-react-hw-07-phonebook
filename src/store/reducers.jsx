import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'; 
import {
  addContact,
  filterContacts,
  deleteContact,
  // addFromLocalStorage,
  getFromApi,
} from '../store/actions';

import axios from 'axios';


const initialState = {
  items: [],
  filter: '',
  status: 'idle',
};

axios.defaults.baseURL = 'https://62cc50dba080052930a97fa6.mockapi.io';

export const fetchContacts = createAsyncThunk(getFromApi, async () => {
  const response = await axios.get('/contacts');
  return response.contacts;
});

// export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
//   const initialTodo = { text };
//   const response = await axios.post('/fakeApi/todos', { todo: initialTodo });
//   return response.todo;
// });


export const contactReducer = createReducer(initialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.items = [...state.items, action.payload];
    })

    .addCase(fetchContacts.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.status = 'idle';
    })

    // .addCase(addFromLocalStorage, (state, action) => {
    //   state.items = [...state.items, ...action.payload];
    // })
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
