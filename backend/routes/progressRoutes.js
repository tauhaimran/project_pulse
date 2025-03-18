import express from 'express';
import { generateGanttChart, generateBurnDownChart } from '../controllers/progressController.js';

const router = express.Router();

router.get('/gantt/:projectId', generateGanttChart);
router.get('/burndown/:projectId', generateBurnDownChart);

export default router;
