import mongoose from 'mongoose';
import User from '../models/User';

describe('User model', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should correctly create a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'testuser@test.com',
            first_name: 'Test',
            last_name: 'User',
            password: 'testpassword',
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.first_name).toBe(userData.first_name);
        expect(savedUser.last_name).toBe(userData.last_name);
        expect(savedUser.password).toBe(userData.password);
    });

    it('should throw a validation error if required fields are missing', async () => {
        const userData = {
            username: 'testuser',
        };

        const user = new User(userData);
        let err = null;
        try {
            await user.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
        expect(err.errors.first_name).toBeDefined();
        expect(err.errors.last_name).toBeDefined();
        expect(err.errors.password).toBeDefined();
    });
});
