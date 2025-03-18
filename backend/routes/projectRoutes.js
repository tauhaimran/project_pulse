const express = require('express');
const router = express.Router();
const { createProject, updateProject } = require('../controllers/projectController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, requireRole(['Manager']), createProject);
router.put('/:projectID', verifyToken, requireRole(['Manager']), updateProject);

module.exports = router;
// This code snippet defines the project routes using the express.Router() method. It imports the createProject and updateProject functions from the projectController.js file and assigns them to the corresponding routes using the router.post() and router.put() methods. It also imports the verifyToken and requireRole middleware functions from the authMiddleware.js file to handle authentication and authorization. Finally, it exports the router for use in the main app.js file.