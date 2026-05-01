import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        default: "Pending"
    },
    specialRequests: {
        type: String
    },
    userEmail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('bookings', bookingSchema);
export default Booking;
