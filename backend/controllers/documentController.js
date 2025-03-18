import { Document } from '../models/Document.js';

// Upload a Document
export const uploadDocument = async (req, res) => {
    try {
        const newDocument = new Document(req.body);
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit a Document
export const editDocument = async (req, res) => {
    try {
        const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDocument);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
