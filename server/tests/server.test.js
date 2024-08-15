const request = require('supertest');
const app = require('../server/server');

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the user routes', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
    });

    test('It should response the POST method', async () => {
        const response = await request(app)
            .post('/users')
            .send({ username: 'test', password: 'test123' });
        expect(response.statusCode).toBe(201);
    });
});

describe('Test the drug routes', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/drugs');
        expect(response.statusCode).toBe(200);
    });

    test('It should response the POST method', async () => {
        const response = await request(app)
            .post('/drugs')
            .send({ username: 'test', details: { product_ndc: '123456' } });
        expect(response.statusCode).toBe(201);
    });
});
