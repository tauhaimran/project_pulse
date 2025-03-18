const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentID: { type: String, required: true, unique: true },
    madeBy: { type: String, required: true },
    taskID: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },
    data: { type: String, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
