import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app'; 

dotenv.config();

describe('Auth', () => {
  it('rejects empty login', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });
});
