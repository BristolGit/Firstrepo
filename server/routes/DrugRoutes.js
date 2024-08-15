import { Router } from 'express';
import { getAllUserDrugs, addDrug, deleteDrug, deleteDrugNDC } from '../controllers/DrugController.js';

const router = Router();

router.get('/drugs', getAllUserDrugs);
router.post('/drug', addDrug);
router.delete('/drug', deleteDrug);
router.delete('/drugNDC', deleteDrugNDC);

export default router;