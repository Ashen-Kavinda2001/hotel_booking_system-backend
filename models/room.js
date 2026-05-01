import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Standard", "Deluxe", "Luxury"]
    },
    maxGuests: {
        type: Number,
        required: true
    },
    photos: [
        {
            type: String
        }
    ],
    description: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model('rooms', roomSchema);
export default Room;
