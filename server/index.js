import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Placeholder Routes
app.post('/api/checkout', (req, res) => {
  console.log('Checkout request received:', req.body);
  res.status(200).json({ success: true, message: 'Checkout processed (placeholder)' });
});

app.post('/api/email-capture', (req, res) => {
  console.log('Email capture request received:', req.body);
  res.status(200).json({ success: true, message: 'Email captured (placeholder)' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Biomen Labs Backend running on port ${PORT}`);
});
