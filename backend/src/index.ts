import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';
import transferRoutes from './routes/transferRoutes';
import dotenv from 'dotenv';

const app = express();

dotenv.config({
  path: '.env'
})
app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use('/api/transfers', transferRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
