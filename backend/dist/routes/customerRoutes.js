"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerModel_1 = require("../models/customerModel");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    (0, customerModel_1.getAllCustomers)((err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    (0, customerModel_1.getCustomerById)(id, (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        if (!results)
            return res.status(404).json({ error: 'Customer not found' });
        res.json(results);
    });
});
router.post('/', (req, res) => {
    const customer = req.body;
    (0, customerModel_1.createCustomer)(customer, (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(201).json(results);
    });
});
exports.default = router;
