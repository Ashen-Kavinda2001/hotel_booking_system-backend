import express from 'express';
import { getInquiries, createInquiry, updateInquiryStatus, deleteInquiry } from '../controllers/InquiryController.js';

const inquiryRouter = express.Router();

inquiryRouter.get('/', getInquiries);
inquiryRouter.post('/', createInquiry);
inquiryRouter.patch('/:id/status', updateInquiryStatus);
inquiryRouter.delete('/:id', deleteInquiry);

export default inquiryRouter;
