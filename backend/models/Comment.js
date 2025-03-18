import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentID: String,
    madeBy: String,
    taskID: String,
    timeStamp: Date,
    data: String
});

export const Comment = mongoose.model('Comment', commentSchema);
