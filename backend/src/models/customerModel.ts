import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Customer, CustomerCallback } from '../types';
import connection from '../db';

export const getAllCustomers = (callback: CustomerCallback): void => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) return callback(err);
    const customers = results as RowDataPacket[];
    callback(null, customers.map(row => row as Customer));
  });
};

export const getCustomerById = (id: number, callback: CustomerCallback): void => {
  connection.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    const rows = results as RowDataPacket[];
    if (rows.length === 0) return callback(null, null); // No customer found
    callback(null, rows[0] as Customer); // Cast the first row to Customer
  });
};

export const createCustomer = (customer: { name: string; email: string; balance: number }, callback: CustomerCallback): void => {
  connection.query('INSERT INTO customers SET ?', customer, (err, results: ResultSetHeader) => {
    if (err) return callback(err);
    const newCustomer: Customer = { id: results.insertId, ...customer };
    callback(null, newCustomer);
  });
};
