import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/UserController.js';

const router = Router();

router.post('/login_user', getUser);
router.post('/user', createUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);


export default router;