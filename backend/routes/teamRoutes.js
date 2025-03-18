import express from 'express';
import { createTeam, updateTeam } from '../controllers/teamController.js';

const router = express.Router();

router.post('/create', createTeam);
router.put('/update/:id', updateTeam);

export default router;
