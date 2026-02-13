require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API CICD",
    version: '1.0.0',
    documentation: '/health, /products',
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
  });
});

app.get('/products', (req, res) => {
  res.json({
    products: [
      { id: 1, name: 'Produit A', price: 19.99 },
      { id: 2, name: 'Produit B', price: 29.99 },
      { id: 3, name: 'Produit C', price: 39.99 },
    ],
  });
});

app.get('client', (req, res) => {
  res.json({
    client: {
      id: 123,
      name: 'Client Exemple',
      email: 'client@client.cicd'
      }
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 API démarrée sur http://localhost:${PORT} (${NODE_ENV})`);
});
