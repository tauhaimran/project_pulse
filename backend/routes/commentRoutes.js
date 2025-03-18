import express from 'express';
import { addComment, removeComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/add', addComment);
router.delete('/remove/:id', removeComment);

export default router;
// This file defines the routes for comment-related operations in the application.