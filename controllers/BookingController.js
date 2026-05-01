import Booking from '../models/booking.js';

export function getBookings(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login to view bookings'
        });
    }

    if (user.type === 'Admin') {
        Booking.find().populate('userId').populate('roomId').then(
            (bookings) => {
                res.json({
                    list: bookings
                });
            }
        ).catch(() => {
            res.status(500).json({
                message: 'Error fetching bookings'
            });
        });
    } else {
        Booking.find({ userId: user.id }).populate('roomId').then(
            (bookings) => {
                res.json({
                    list: bookings
                });
            }
        ).catch(() => {
            res.status(500).json({
                message: 'Error fetching bookings'
            });
        });
    }
}

export function createBooking(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login to make a booking'
        });
    }

    const bookingData = {
        userId: user.id,
        userEmail: user.email,
        roomId: req.body.roomId,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        numberOfGuests: req.body.numberOfGuests,
        totalPrice: req.body.totalPrice,
        specialRequests: req.body.specialRequests
    };

    const newBooking = new Booking(bookingData);
    newBooking.save().then(() => {
        res.json({
            message: 'Booking created successfully'
        });
    }).catch(() => {
        res.status(500).json({
            message: 'Error creating booking'
        });
    });
}

export function cancelBooking(req, res) {
    const user = req.body.user;
    if (!user) {
        return res.status(403).json({
            message: 'Please login'
        });
    }

    const bookingId = req.params.id;
    
    Booking.findById(bookingId).then(
        (booking) => {
            if (!booking) {
                return res.status(404).json({
                    message: 'Booking not found'
                });
            }

            if (user.type !== 'Admin' && booking.userId.toString() !== user.id) {
                return res.status(403).json({
                    message: 'You cannot cancel this booking'
                });
            }

            Booking.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true }).then(
                (updatedBooking) => {
                    res.json({
                        message: 'Booking cancelled successfully',
                        booking: updatedBooking
                    });
                }
            ).catch(() => {
                res.status(500).json({
                    message: 'Error cancelling booking'
                });
            });
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error fetching booking'
        });
    });
}

export function updateBookingStatus(req, res) {
    const user = req.body.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can update booking status'
        });
    }

    const bookingId = req.params.id;
    Booking.findByIdAndUpdate(bookingId, { status: req.body.status }, { new: true }).then(
        (booking) => {
            if (booking) {
                res.json({
                    message: 'Booking status updated successfully',
                    booking: booking
                });
            } else {
                res.status(404).json({
                    message: 'Booking not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error updating booking'
        });
    });
}
