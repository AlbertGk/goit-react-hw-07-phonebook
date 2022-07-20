import axios from 'axios';

export const mockApiInstance = axios.create({
  baseURL: 'https://62cc50dba080052930a97fa6.mockapi.io/contacts/',
});