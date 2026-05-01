import mongoose from "mongoose";

const inquirySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved", "Closed"],
        default: "Open"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Inquiry = mongoose.model('inquiries', inquirySchema);
export default Inquiry;
