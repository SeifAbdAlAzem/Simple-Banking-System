"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transferModel_1 = require("../models/transferModel");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    const transfer = req.body;
    (0, transferModel_1.createTransfer)(transfer, (err, results) => {
        if (err) {
            console.error('Error creating transfer:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results);
    });
});
exports.default = router;
