import Drug from "../models/Drug.js";
import { getAllUserDrugs, addDrug, deleteDrug, deleteDrugNDC } from "../controllers/drugController.js";
import { v4 as uuidv4 } from 'uuid';

jest.mock('../models/Drug.js');

describe('drugController', () => {
    const mockDrug = {
        drug_id: uuidv4(),
        username: 'testuser',
        details: {
            product_ndc: '12345-6789',
            product_name: 'Test Drug',
            dosage_form: 'Tablet',
            route: 'Oral',
            active_ingredient: 'Test Ingredient'
        }
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getAllUserDrugs', () => {
        test('should return all drugs associated with a given user', async () => {
            Drug.find.mockResolvedValue([mockDrug]);

            const result = await getAllUserDrugs({ query: { id: mockDrug.username } }, {});

            expect(Drug.find).toHaveBeenCalledWith({ username: mockDrug.username });
            expect(result).toEqual([mockDrug]);
        });

        test('should return 204 status if no drugs are found for given user', async () => {
            Drug.find.mockResolvedValue([]);

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await getAllUserDrugs({ query: { id: 'nonexistentuser' } }, res);

            expect(Drug.find).toHaveBeenCalledWith({ username: 'nonexistentuser' });
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith({ message: "Drug not found" });
        });

        test('should return 500 status if an error occurs', async () => {
            Drug.find.mockRejectedValue('Database error');

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await getAllUserDrugs({ query: { id: mockDrug.username } }, res);

            expect(Drug.find).toHaveBeenCalledWith({ username: mockDrug.username });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Error");
        });
    });

    describe('addDrug', () => {
        test('should add a new drug and return it', async () => {
            const req = {
                body: {
                    username: mockDrug.username,
                    details: mockDrug.details
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Drug.prototype.save.mockResolvedValue();

            const result = await addDrug(req, res);

            expect(Drug).toHaveBeenCalledWith({ drug_id: expect.any(String), ...req.body });
            expect(Drug.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ drug_id: expect.any(String), ...req.body }));
        });

        test('should return 500 status if an error occurs', async () => {
            const req = {
                body: {
                    username: mockDrug.username,
                    details: mockDrug.details
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Drug.prototype.save.mockRejectedValue('Database error');

            await addDrug(req, res);

            expect(Drug).toHaveBeenCalledWith({ drug_id: expect.any(String), ...req.body });
            expect(Drug.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Database error');
        });
    });

    describe('deleteDrug', () => {describe('deleteDrug', () => {
        const mockDrug = {
            drug_id: '1234',
            username: 'testuser',
            details: {
                product_ndc: '0001-0001-01',
                name: 'Test Drug',
                strength: '10mg',
                form: 'Tablet',
                quantity: 30
            }
        };

        beforeEach(() => {
            jest.resetAllMocks();
        });

        test('should delete the drug with the given drug_id and return success message', async () => {
            Drug.deleteOne.mockResolvedValue({ deletedCount: 1 });
            const result = await deleteDrug({ body: { drug_id: mockDrug.drug_id } }, null);

            expect(Drug.deleteOne).toHaveBeenCalledWith({ drug_id: mockDrug.drug_id });
            expect(result.status).toBe(200);
            expect(result.json).toHaveBeenCalledWith({ message: 'Drug successfully deleted' });
        });
        test('should return an error message if the drug is not found', async () => {
            Drug.deleteOne.mockResolvedValue({ deletedCount: 0 });
            const result = await deleteDrug({ body: { drug_id: mockDrug.drug_id } }, null);

            expect(Drug.deleteOne).toHaveBeenCalledWith({ drug_id: mockDrug.drug_id });
            expect(result.status).toBe(404);
            expect(result.json).toHaveBeenCalledWith({ message: 'Drug not found' });
        });
    });

        describe('deleteDrugNDC', () => {
            const mockDrug = {
                drug_id: '1234',
                username: 'testuser',
                details: {
                    product_ndc: '0001-0001-01',
                    name: 'Test Drug',
                    strength: '10mg',
                    form: 'Tablet',
                    quantity: 30
                }
            };

            beforeEach(() => {
                jest.resetAllMocks();
            });

            test('should delete the drug with the given product_ndc and return success message', async () => {
                Drug.deleteOne.mockResolvedValue({ deletedCount: 1 });
                const result = await deleteDrugNDC({ body: { ndc: mockDrug.details.product_ndc } }, null);

                expect(Drug.deleteOne).toHaveBeenCalledWith({ 'details.product_ndc': mockDrug.details.product_ndc });
                expect(result.status).toBe(200);
                expect(result.json).toHaveBeenCalledWith({ message: 'Drug successfully deleted' });
            });

            test('should return an error message if the drug is not found', async () => {
                Drug.deleteOne.mockResolvedValue({ deletedCount: 0 });
                const result = await deleteDrugNDC({ body: { ndc: mockDrug.details.product_ndc } }, null);

                expect(Drug.deleteOne).toHaveBeenCalledWith({ 'details.product_ndc': mockDrug.details.product_ndc });
                expect(result.status).toBe(404);
                expect(result.json).toHaveBeenCalledWith({ message: 'Drug not found' });
            });
        });
    });
});


