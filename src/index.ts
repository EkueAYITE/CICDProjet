import 'dotenv/config';
import express, { Request, Response } from 'express';
import { version } from '../package.json';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: "Bienvenue sur l'API CICD",
    version,
    documentation: '/health, /client, /products',
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
  });
});

app.get('/products', (_req: Request, res: Response) => {
  res.json({
    products: [
      { id: 1, name: 'Produit A', price: 19.99 },
      { id: 2, name: 'Produit B', price: 29.99 },
      { id: 3, name: 'Produit C', price: 39.99 },
    ],
  });
});

app.get('/client', (_req: Request, res: Response) => {
  res.json({
    client: {
      id: 123,
      name: 'Client Exemple',
      email: 'client@client.cicd',
    },
  });
});

// Export pour les tests
export { app };

// Démarrage du serveur (pas en mode test)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API démarrée sur http://localhost:${PORT} (${NODE_ENV})`);
  });
}
