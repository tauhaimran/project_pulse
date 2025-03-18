import express from 'express';
import { createProject, updateProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/create', createProject);
router.put('/update/:id', updateProject);

export default router;
