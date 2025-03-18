const express = require('express');
const router = express.Router();
const { addComment, removeComment, viewComments } = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Adding a Comment
router.post('/add', verifyToken, addComment);

// Removing a Comment
router.delete('/remove/:taskID/:commentID', verifyToken, removeComment);

// Viewing Comments for a Task
router.get('/view/:taskID', verifyToken, viewComments);

module.exports = router;
// Compare this snippet from backend/models/Comment.js: