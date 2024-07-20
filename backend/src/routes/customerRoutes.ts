import { Router } from 'express';
import { getAllCustomers, getCustomerById, createCustomer } from '../models/customerModel';

const router = Router();

router.get('/', (req, res) => {
  getAllCustomers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  getCustomerById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results) return res.status(404).json({ error: 'Customer not found' });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const customer = req.body;
  createCustomer(customer, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(results);
  });
});

export default router;
