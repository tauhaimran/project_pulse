import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    taskID: String,
    documentID: String,
    fileName: String
});

export const Document = mongoose.model('Document', documentSchema);
