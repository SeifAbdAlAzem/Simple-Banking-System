"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransfer = void 0;
const db_1 = __importDefault(require("../db"));
// Create a new transfer
const createTransfer = (transfer, callback) => {
    // Mapping Transfer object to database column names
    const dbTransfer = {
        from_id: transfer.fromCustomerId,
        to_id: transfer.toCustomerId,
        amount: transfer.amount,
    };
    db_1.default.query('INSERT INTO transfers SET ?', dbTransfer, (err, results) => {
        if (err)
            return callback(err);
        // Update balances
        db_1.default.query('UPDATE customers SET balance = balance - ? WHERE id = ?', [transfer.amount, transfer.fromCustomerId], (err) => {
            if (err)
                return callback(err);
            db_1.default.query('UPDATE customers SET balance = balance + ? WHERE id = ?', [transfer.amount, transfer.toCustomerId], (err) => {
                if (err)
                    return callback(err);
                callback(null, results);
            });
        });
    });
};
exports.createTransfer = createTransfer;
