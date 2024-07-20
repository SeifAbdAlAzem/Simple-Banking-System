import { ResultSetHeader } from 'mysql2';

export interface Customer {
  id: number;
  name: string;
  email: string;
  balance: number;
}

export interface Transfer {
  fromCustomerId: number;
  toCustomerId: number;
  amount: number;
}

export type CustomerCallback = (err: Error | null, results?: Customer[] | Customer | null) => void;

export type TransferCallback = (err: Error | null, results?: ResultSetHeader) => void;
