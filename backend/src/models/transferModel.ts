import { ResultSetHeader } from 'mysql2';
import { Transfer, TransferCallback } from '../types';
import connection from '../db';

// Create a new transfer
export const createTransfer = (transfer: Transfer, callback: TransferCallback): void => {
    // Mapping Transfer object to database column names
    const dbTransfer = {
        from_id: transfer.fromCustomerId,
        to_id: transfer.toCustomerId,
        amount: transfer.amount,
    };

    connection.query('INSERT INTO transfers SET ?', dbTransfer, (err, results: ResultSetHeader) => {
        if (err) return callback(err);

        // Update balances
        connection.query('UPDATE customers SET balance = balance - ? WHERE id = ?', [transfer.amount, transfer.fromCustomerId], (err) => {
            if (err) return callback(err);
            connection.query('UPDATE customers SET balance = balance + ? WHERE id = ?', [transfer.amount, transfer.toCustomerId], (err) => {
                if (err) return callback(err);
                callback(null, results);
            });
        });
    });
};
