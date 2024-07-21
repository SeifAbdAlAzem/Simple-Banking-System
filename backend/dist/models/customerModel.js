"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = exports.getCustomerById = exports.getAllCustomers = void 0;
const db_1 = __importDefault(require("../db"));
const getAllCustomers = (callback) => {
    db_1.default.query('SELECT * FROM customers', (err, results) => {
        if (err)
            return callback(err);
        const customers = results;
        callback(null, customers.map(row => row));
    });
};
exports.getAllCustomers = getAllCustomers;
const getCustomerById = (id, callback) => {
    db_1.default.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
        if (err)
            return callback(err);
        const rows = results;
        if (rows.length === 0)
            return callback(null, null); // No customer found
        callback(null, rows[0]); // Cast the first row to Customer
    });
};
exports.getCustomerById = getCustomerById;
const createCustomer = (customer, callback) => {
    db_1.default.query('INSERT INTO customers SET ?', customer, (err, results) => {
        if (err)
            return callback(err);
        const newCustomer = { id: results.insertId, ...customer };
        callback(null, newCustomer);
    });
};
exports.createCustomer = createCustomer;
