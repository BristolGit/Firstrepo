import User from '../models/User';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/UserController';

jest.mock('../models/User');

describe('UserController', () => {
    const mockUser = {
        username: 'testuser',
        email: 'testuser@test.com',
        first_name: 'Test',
        last_name: 'User',
        password: 'testpassword',
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('createUser', () => {
        test('should create a new user and return it', async () => {
            User.exists.mockReturnValue(false);
            User.create.mockResolvedValue(mockUser);

            const result = await createUser(mockUser);

            expect(User.exists).toHaveBeenCalledWith({ username: mockUser.username });
            expect(User.create).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockUser);
        });

        test('should throw an error if the username already exists', async () => {
            User.exists.mockReturnValue(true);

            await expect(createUser(mockUser)).rejects.toThrow('Username already exists');
            expect(User.exists).toHaveBeenCalledWith({ username: mockUser.username });
            expect(User.create).not.toHaveBeenCalled();
        });
    });

    describe('getUser', () => {
        test('should return the user with the given username and password', async () => {
            User.findOne.mockResolvedValue(mockUser);

            const result = await getUser({ username: mockUser.username, password: mockUser.password });

            expect(User.findOne).toHaveBeenCalledWith({ username: mockUser.username });
            expect(result).toEqual([mockUser]);
        });

        test('should return null if the user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await getUser({ username: 'nonexistentuser', password: 'testpassword' });

            expect(User.findOne).toHaveBeenCalledWith({ username: 'nonexistentuser' });
            expect(result).toBeNull();
        });

        test('should return null if the password is incorrect', async () => {
            User.findOne.mockResolvedValue({ ...mockUser, password: 'wrongpassword' });

            const result = await getUser({ username: mockUser.username, password: 'testpassword' });

            expect(User.findOne).toHaveBeenCalledWith({ username: mockUser.username });
            expect(result).toBeNull();
        });
    });

    describe('updateUser', () => {
        test('should update the user with the given username and return the result', async () => {
            User.updateOne.mockResolvedValue({ n: 1, nModified: 1, ok: 1 });

            const updatedUser = { first_name: 'Updated', last_name: 'User' };
            const result = await updateUser(mockUser.username, updatedUser);

            expect(User.updateOne).toHaveBeenCalledWith({ username: mockUser.username }, updatedUser);
            expect(result).toEqual({ n: 1, nModified: 1, ok: 1 });
        });

        test('should throw an error if the user is not found', async () => {
            User.updateOne.mockResolvedValue({ n: 0 });

            const updatedUser = { first_name: 'Updated', last_name: 'User' };
            await expect(updateUser('nonexistentuser', updatedUser)).rejects.toThrow('User not found');
            expect(User.updateOne).toHaveBeenCalledWith({ username: 'nonexistentuser' }, updatedUser);
        });
    });

    describe('deleteUser', () => {
        test('should delete the user with the given username and return the result', async () => {
            User.deleteOne.mockResolvedValue({ n: 1, ok: 1 });

            const result = await deleteUser(mockUser.username);

            expect(User.deleteOne).toHaveBeenCalledWith({ username: mockUser.username });
            expect(result).toEqual({ n: 1, ok: 1 });
        });

        test('should throw an error if the user is not found', async () => {
            User.deleteOne.mockResolvedValue({ n: 0 });

            await expect(deleteUser('nonexistentuser')).rejects.toThrow('User not found');
            expect(User.deleteOne).toHaveBeenCalledWith({ username: 'nonexistentuser' });
        });
    });
});
