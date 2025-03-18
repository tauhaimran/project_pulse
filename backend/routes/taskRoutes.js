import express from 'express';
import { createTask, getTasksByProjectID } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/:projectID', getTasksByProjectID);

export default router;
