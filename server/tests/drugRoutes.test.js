import request from 'supertest';
import app from '../server';

describe('Drug Routes', () => {
    it('should get all drugs for a user', async () => {
        const response = await request(app).get('/api/drugs').send({ username: 'testuser' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should add a new drug for a user', async () => {
        const newDrug = {
            drug_id: '12345',
            username: 'testuser',
            details: {
                brand_name: 'Advil',
                generic_name: 'Ibuprofen',
                active_ingredients: [
                    { name: 'Ibuprofen', strength: '200mg' },
                    { name: 'Ibuprofen', strength: '400mg' },
                ],
            },
        };

        const response = await request(app).post('/api/drug').send(newDrug);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newDrug);
    });

    it('should delete a drug for a user by drug_id', async () => {
        const drugToDelete = {
            drug_id: '12345',
            username: 'testuser',
            details: {
                brand_name: 'Advil',
                generic_name: 'Ibuprofen',
                active_ingredients: [
                    { name: 'Ibuprofen', strength: '200mg' },
                    { name: 'Ibuprofen', strength: '400mg' },
                ],
            },
        };
        await request(app).post('/api/drug').send(drugToDelete);

        const response = await request(app).delete('/api/drug').send({ drug_id: '12345', username: 'testuser' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Drug successfully deleted');
    });

    it('should delete a drug for a user by NDC', async () => {
        const drugToDelete = {
            drug_id: '12345',
            username: 'testuser',
            details: {
                brand_name: 'Advil',
                generic_name: 'Ibuprofen',
                active_ingredients: [
                    { name: 'Ibuprofen', strength: '200mg' },
                    { name: 'Ibuprofen', strength: '400mg' },
                ],
                NDC: '1234567890',
            },
        };
        await request(app).post('/api/drug').send(drugToDelete);

        const response = await request(app).delete('/api/drugNDC').send({ NDC: '1234567890', username: 'testuser' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Drug successfully deleted');
    });
});
