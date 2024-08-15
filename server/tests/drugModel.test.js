import mongoose from 'mongoose';
import Drug from '../models/Drug';

describe('Drug model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Drug.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should create a new drug', async () => {
        const drug = new Drug({
            drug_id: '12345',
            username: 'testuser',
            details: {
                name: 'Test Drug',
                description: 'This is a test drug',
            },
        });

        const savedDrug = await drug.save();
        expect(savedDrug.drug_id).toEqual('12345');
        expect(savedDrug.username).toEqual('testuser');
        expect(savedDrug.details.name).toEqual('Test Drug');
        expect(savedDrug.details.description).toEqual('This is a test drug');
    });

    test('should not save a drug without drug_id', async () => {
        const drug = new Drug({
            username: 'testuser',
            details: {
                name: 'Test Drug',
                description: 'This is a test drug',
            },
        });

        await expect(drug.save()).rejects.toThrow();
    });

    test('should not save a drug without username', async () => {
        const drug = new Drug({
            drug_id: '12345',
            details: {
                name: 'Test Drug',
                description: 'This is a test drug',
            },
        });

        await expect(drug.save()).rejects.toThrow();
    });

    test('should not save a drug without details', async () => {
        const drug = new Drug({
            drug_id: '12345',
            username: 'testuser',
        });

        await expect(drug.save()).rejects.toThrow();
    });
});
