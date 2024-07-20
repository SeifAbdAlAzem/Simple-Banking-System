import { Router } from 'express';
import { createTransfer } from '../models/transferModel';

const router = Router();

router.post('/', (req, res) => {
  const transfer = req.body;
  createTransfer(transfer, (err, results) => {
    if (err) {
      console.error('Error creating transfer:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(results);
  });
});

export default router;
