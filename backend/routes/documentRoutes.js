import express from 'express';
import { uploadDocument, editDocument } from '../controllers/documentController.js';

const router = express.Router();

router.post('/upload', uploadDocument);
router.put('/edit/:id', editDocument);

export default router;
