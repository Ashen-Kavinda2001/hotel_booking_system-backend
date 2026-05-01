import express from 'express';
import { getBookings, createBooking, cancelBooking, updateBookingStatus } from '../controllers/BookingController.js';

const bookingRouter = express.Router();

bookingRouter.get('/', getBookings);
bookingRouter.post('/', createBooking);
bookingRouter.patch('/:id/cancel', cancelBooking);
bookingRouter.patch('/:id/status', updateBookingStatus);

export default bookingRouter;
