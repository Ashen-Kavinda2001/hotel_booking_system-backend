import express from 'express';
import { getApprovedFeedbacks, getAllFeedbacks, createFeedback, approveFeedback, deleteFeedback } from '../controllers/FeedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/approved', getApprovedFeedbacks);
feedbackRouter.get('/all', getAllFeedbacks);
feedbackRouter.post('/', createFeedback);
feedbackRouter.patch('/:id/approve', approveFeedback);
feedbackRouter.delete('/:id', deleteFeedback);

export default feedbackRouter;
