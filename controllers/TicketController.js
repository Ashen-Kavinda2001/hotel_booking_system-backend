import Ticket from '../models/ticket.js';

export function getTickets(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login'
        });
    }

    if (user.type === 'Admin') {
        Ticket.find().populate('userId', 'Firstname Lastname email').then(
            (tickets) => {
                res.json({
                    list: tickets
                });
            }
        ).catch(() => {
            res.status(500).json({
                message: 'Error fetching tickets'
            });
        });
    } else {
        Ticket.find({ userId: user.id }).then(
            (tickets) => {
                res.json({
                    list: tickets
                });
            }
        ).catch(() => {
            res.status(500).json({
                message: 'Error fetching tickets'
            });
        });
    }
}

export function createTicket(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login to create ticket'
        });
    }

    const ticketData = {
        userId: user.id,
        subject: req.body.subject,
        description: req.body.description,
        priority: req.body.priority || 'Medium'
    };

    const newTicket = new Ticket(ticketData);
    newTicket.save().then(() => {
        res.json({
            message: 'Ticket created successfully'
        });
    }).catch(() => {
        res.status(500).json({
            message: 'Error creating ticket'
        });
    });
}

export function updateTicketStatus(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can update ticket status'
        });
    }

    const ticketId = req.params.id;
    Ticket.findByIdAndUpdate(ticketId, { status: req.body.status, updatedAt: Date.now() }, { new: true }).then(
        (ticket) => {
            if (ticket) {
                res.json({
                    message: 'Ticket status updated successfully',
                    ticket: ticket
                });
            } else {
                res.status(404).json({
                    message: 'Ticket not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error updating ticket'
        });
    });
}

export function assignTicket(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can assign tickets'
        });
    }

    const ticketId = req.params.id;
    Ticket.findByIdAndUpdate(ticketId, { assignedTo: req.body.assignedTo, updatedAt: Date.now() }, { new: true }).then(
        (ticket) => {
            if (ticket) {
                res.json({
                    message: 'Ticket assigned successfully',
                    ticket: ticket
                });
            } else {
                res.status(404).json({
                    message: 'Ticket not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error assigning ticket'
        });
    });
}

export function closeTicket(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login'
        });
    }

    const ticketId = req.params.id;
    Ticket.findByIdAndUpdate(ticketId, { status: 'Closed', updatedAt: Date.now() }, { new: true }).then(
        (ticket) => {
            if (ticket) {
                res.json({
                    message: 'Ticket closed successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Ticket not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error closing ticket'
        });
    });
}
