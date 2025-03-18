const Comment = require('../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a comment
exports.removeComment = async (req, res) => {
    try {
        const { commentID } = req.params;
        await Comment.findOneAndDelete({ commentID });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Compare this snippet from backend/models/Comment.js: