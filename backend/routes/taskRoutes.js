const express = require('express');
const router = express.Router();
const { createTask, updateTask } = require('../controllers/taskController');

router.post('/', createTask);
router.put('/:taskID', updateTask);

module.exports = router;
// In this code snippet, we define two routes: / and /:taskID. We then use the createTask and updateTask functions from the taskController.js file to handle the logic for these routes. Finally, we export the router object so that it can be used in the main app.js file.