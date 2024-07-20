import axios from 'axios';
import { Customer, Transfer } from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<Customer[]>(`${API_URL}/customers`);
  return response.data;
};

export const fetchCustomerById = async (id: string): Promise<Customer> => {
  const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
  return response.data;
};

// services/apiService.ts

export const createTransfer = async (transfer: Transfer): Promise<void> => {
  try {
    await axios.post(`${API_URL}/transfers`, transfer);
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

