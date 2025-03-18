import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    progressID: String,
    projectID: String,
    timeStamp: Date
});

export const Progress = mongoose.model('Progress', progressSchema);
