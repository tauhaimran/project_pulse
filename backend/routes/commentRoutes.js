const express = require('express');
const router = express.Router();
const { addComment, removeComment } = require('../controllers/commentController');

router.post('/', addComment);
router.delete('/:commentID', removeComment);

module.exports = router;
// In this code snippet, we define two routes: / and /:commentID. We then use the addComment and removeComment functions from the commentController.js file to handle the logic for these routes. Finally, we export the router object so that it can be used in the main app.js file.