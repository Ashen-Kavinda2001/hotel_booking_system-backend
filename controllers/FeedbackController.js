import Feedback from '../models/feedback.js';

export function getApprovedFeedbacks(req, res) {
    Feedback.find({ approved: true }).populate('userId', 'Firstname Lastname').then(
        (feedbacks) => {
            res.json({
                list: feedbacks
            });
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error fetching feedbacks'
        });
    });
}

export function getAllFeedbacks(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can view all feedbacks'
        });
    }

    Feedback.find().populate('userId', 'Firstname Lastname email').then(
        (feedbacks) => {
            res.json({
                list: feedbacks
            });
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error fetching feedbacks'
        });
    });
}

export function createFeedback(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login to submit feedback'
        });
    }

    const feedbackData = {
        userId: user.id,
        message: req.body.message,
        rating: req.body.rating
    };

    const newFeedback = new Feedback(feedbackData);
    newFeedback.save().then(() => {
        res.json({
            message: 'Feedback submitted successfully (pending approval)'
        });
    }).catch(() => {
        res.status(500).json({
            message: 'Error submitting feedback'
        });
    });
}

export function approveFeedback(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can approve feedbacks'
        });
    }

    const feedbackId = req.params.id;
    Feedback.findByIdAndUpdate(feedbackId, { approved: true }, { new: true }).then(
        (feedback) => {
            if (feedback) {
                res.json({
                    message: 'Feedback approved successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Feedback not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error approving feedback'
        });
    });
}

export function deleteFeedback(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can delete feedbacks'
        });
    }

    const feedbackId = req.params.id;
    Feedback.findByIdAndDelete(feedbackId).then(
        (feedback) => {
            if (feedback) {
                res.json({
                    message: 'Feedback deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Feedback not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error deleting feedback'
        });
    });
}
