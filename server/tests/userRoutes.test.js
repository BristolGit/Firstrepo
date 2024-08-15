import request from 'supertest';
import app from '../server';
import User from '../models/User';

describe('User routes', () => {
    const testUser = {
        username: 'testuser',
        email: 'testuser@test.com',
        first_name: 'Test',
        last_name: 'User',
        password: 'testpassword'
    };

    beforeEach(async () => {
        // Clear the user collection in the database
        await User.deleteMany({});
    });

    describe('POST /user', () => {
        test('should create a new user', async () => {
            const response = await request(app)
                .post('/user')
                .send(testUser)
                .expect(201);

            expect(response.body).toMatchObject(testUser);

            const user = await User.findOne({ username: testUser.username });
            expect(user).toBeDefined();
        });

        test('should return 409 if username already exists', async () => {
            // Create a user with the same username as testUser
            await User.create(testUser);

            const response = await request(app)
                .post('/user')
                .send(testUser)
                .expect(409);

            expect(response.body).toEqual({ message: 'Username already exists' });
        });
    });

    describe('POST /login_user', () => {
        beforeEach(async () => {
            // Create a test user in the database
            await User.create(testUser);
        });

        test('should login an existing user', async () => {
            const response = await request(app)
                .post('/login_user')
                .send({ username: testUser.username, password: testUser.password })
                .expect(200);

            expect(response.body[0]).toMatchObject(testUser);
        });

        test('should return 204 if user is not found', async () => {
            const response = await request(app)
                .post('/login_user')
                .send({ username: 'nonexistentuser', password: 'testpassword' })
                .expect(204);

            expect(response.body).toEqual({ message: 'User not found' });
        });

        test('should return 401 if password is incorrect', async () => {
            const response = await request(app)
                .post('/login_user')
                .send({ username: testUser.username, password: 'wrongpassword' })
                .expect(401);

            expect(response.body).toEqual({ message: 'Wrong password' });
        });
    });

    describe('PUT /user', () => {
        beforeEach(async () => {
            // Create a test user in the database
            await User.create(testUser);
        });

        test('should update an existing user', async () => {
            const updatedUser = { first_name: 'Updated', last_name: 'User' };
            const response = await request(app)
                .put(`/user?username=${testUser.username}`)
                .send(updatedUser)
                .expect(200);

            expect(response.body).toMatchObject({ n: 1, nModified: 1, ok: 1 });

            const user = await User.findOne({ username: testUser.username });
            expect(user.first_name).toEqual(updatedUser.first_name);
            expect(user.last_name).toEqual(updatedUser.last_name);
        });

        test('should return 404 if user is not found', async () => {
            const updatedUser = { first_name: 'Updated', last_name: 'User' };
            const response = await request(app)
                .put('/user?username=nonexistentuser')
                .send(updatedUser)
                .expect(404);

            expect(response.body).toEqual({ message: 'User not found' });
        });
    });

    describe('DELETE /user', () => {
        beforeEach(async () => {
            // Create a test user in the database
            await User.create(testUser);
        });

        test('should delete an existing user', async () => {
            const response = await request(app)
                .delete(`/user?username=${testUser.username}`)
                .expect(200);

            expect(response.body).toMatchObject({ n: 1, deletedCount: 1, ok: 1 });

            const user = await User.findOne({ username: testUser.username });
            expect(user).toBeNull();
        });

        test('should return 404 if user is not found', async () => {
            const response = await request(app)
                .delete('/user?username=nonexistentuser')
                .expect(404);

            expect(response.body).toEqual({ message: 'User not found' });
        });
    });
});
