const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
// This code snippet defines the user routes using the express.Router() method. It imports the registerUser and loginUser functions from the userController.js file and assigns them to the corresponding routes using the router.post() method. Finally, it exports the router for use in the main app.js file.