const Comment = require('../models/Comment');
const Task = require('../models/Task');

// Add a Comment
exports.addComment = async (req, res) => {
    try {
        const { commentID, madeBy, taskID, data } = req.body;

        const newComment = new Comment({
            commentID,
            madeBy,
            taskID,
            data
        });

        await newComment.save();

        // Also, add the commentID to the Task's comments array
        await Task.findOneAndUpdate(
            { taskID },
            { $push: { comments: commentID } }
        );

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a Comment
exports.removeComment = async (req, res) => {
    try {
        const { commentID, taskID } = req.params;

        await Comment.findOneAndDelete({ commentID });

        // Also, remove the commentID from the Task's comments array
        await Task.findOneAndUpdate(
            { taskID },
            { $pull: { comments: commentID } }
        );

        res.status(200).json({ message: 'Comment removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View Comments for a Task
exports.viewComments = async (req, res) => {
    try {
        const { taskID } = req.params;

        const comments = await Comment.find({ taskID });
        if (!comments) return res.status(404).json({ message: 'No comments found for this task' });

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Path: backend/routes/commentRoutes.js