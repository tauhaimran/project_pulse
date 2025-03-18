import express from 'express';
import { createTeam, getTeamsByProjectID } from '../controllers/teamController.js';

const router = express.Router();

router.post('/', createTeam);
router.get('/:projectID', getTeamsByProjectID);

export default router;
