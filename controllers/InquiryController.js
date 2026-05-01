import Inquiry from '../models/inquiry.js';

export function getInquiries(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login'
        });
    }

    if (user.type === 'Admin') {
        Inquiry.find().populate('userId', 'Firstname Lastname email').then(
            (inquiries) => {
                res.json({
                    list: inquiries
                });
            }
        ).catch(() => {
            res.status(500).json({
                message: 'Error fetching inquiries'
            });
        });
    } else {
        Inquiry.find({ userId: user.id }).then(
            (inquiries) => {
                res.json({
                    list: inquiries
                });
            }
        ).catch(() => {
            res.status(500).json({
                message: 'Error fetching inquiries'
            });
        });
    }
}

export function createInquiry(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login to submit inquiry'
        });
    }

    const inquiryData = {
        userId: user.id,
        subject: req.body.subject,
        message: req.body.message
    };

    const newInquiry = new Inquiry(inquiryData);
    newInquiry.save().then(() => {
        res.json({
            message: 'Inquiry submitted successfully'
        });
    }).catch(() => {
        res.status(500).json({
            message: 'Error submitting inquiry'
        });
    });
}

export function updateInquiryStatus(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can update inquiry status'
        });
    }

    const inquiryId = req.params.id;
    Inquiry.findByIdAndUpdate(inquiryId, { status: req.body.status }, { new: true }).then(
        (inquiry) => {
            if (inquiry) {
                res.json({
                    message: 'Inquiry status updated successfully',
                    inquiry: inquiry
                });
            } else {
                res.status(404).json({
                    message: 'Inquiry not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error updating inquiry'
        });
    });
}

export function deleteInquiry(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can delete inquiries'
        });
    }

    const inquiryId = req.params.id;
    Inquiry.findByIdAndDelete(inquiryId).then(
        (inquiry) => {
            if (inquiry) {
                res.json({
                    message: 'Inquiry deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Inquiry not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error deleting inquiry'
        });
    });
}
