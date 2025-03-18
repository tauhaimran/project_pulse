import express from 'express';
import { createTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/create', createTask);
router.put('/update/:id', updateTask);

export default router;
