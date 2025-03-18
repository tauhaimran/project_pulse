import express from 'express';
import { loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);

export default router;
// This file defines the routes for user-related operations in the application.
// It imports the loginUser function from the userController.js file and sets up a POST route for the /login endpoint.