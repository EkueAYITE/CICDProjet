import request from 'supertest';
import { app } from '../src/index';
import { version } from '../package.json';

describe('API CICD', () => {
  describe('GET /', () => {
    it('doit retourner le message de bienvenue', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        message: "Bienvenue sur l'API CICD",
        version,
        documentation: '/health, /client, /products',
      });
    });
  });

  describe('GET /health', () => {
    it('doit retourner le statut OK', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'ok',
        environment: 'test',
      });
      expect(response.body.timestamp).toBeDefined();
      expect(typeof response.body.uptime).toBe('number');
    });
  });

  describe('GET /products', () => {
    it('doit retourner la liste des produits', async () => {
      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body.products).toHaveLength(3);
      expect(response.body.products[0]).toEqual({
        id: 1,
        name: 'Produit A',
        price: 19.99,
      });
      expect(response.body.products[1]).toEqual({
        id: 2,
        name: 'Produit B',
        price: 29.99,
      });
      expect(response.body.products[2]).toEqual({
        id: 3,
        name: 'Produit C',
        price: 39.99,
      });
    });
  });

  describe('GET /client', () => {
    it('doit retourner les informations du client', async () => {
      const response = await request(app).get('/client');

      expect(response.status).toBe(200);
      expect(response.body.client).toEqual({
        id: 123,
        name: 'Client Exemple',
        email: 'client@client.cicd',
      });
    });
  });

  describe('Routes inexistantes', () => {
    it('doit retourner 404 pour une route inconnue', async () => {
      const response = await request(app).get('/route-inexistante');

      expect(response.status).toBe(404);
    });
  });
});
