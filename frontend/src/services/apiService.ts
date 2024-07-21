import axios from 'axios';
import { Customer, Transfer } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  throw new Error('Missing REACT_APP_API_BASE_URL environment variable');
}

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<Customer[]>(`${API_BASE_URL}/customers`);
  return response.data;
};

export const fetchCustomerById = async (id: string): Promise<Customer> => {
  const response = await axios.get<Customer>(`${API_BASE_URL}/customers/${id}`);
  return response.data;
};

export const createTransfer = async (transfer: Transfer): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/transfers`, transfer);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating transfer:', error.message);
      console.error('Error response:', error.response);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Rethrow the error if you want to handle it elsewhere
  }
};


// import axios from 'axios';
// import { Customer, Transfer } from '../types';

// const API_URL = process.env.REACT_APP_API_BASE_URL || '';

// export const fetchCustomers = async (): Promise<Customer[]> => {
//   const response = await axios.get<Customer[]>(`${API_URL}/customers`);
//   return response.data;
// };

// export const fetchCustomerById = async (id: string): Promise<Customer> => {
//   const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
//   return response.data;
// };

// // services/apiService.ts

// export const createTransfer = async (transfer: Transfer): Promise<void> => {
//   try {
//     await axios.post(`${API_URL}/transfers`, transfer);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error creating transfer:', error.message);
//       console.error('Error response:', error.response);
//     } else {
//       console.error('Unexpected error:', error);
//     }
//     throw error; // Rethrow the error if you want to handle it elsewhere
//   }
// };

