import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Urgent"],
        default: "Medium"
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved", "Closed"],
        default: "Open"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model('tickets', ticketSchema);
export default Ticket;
