import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    seats: [String],
    totalAmount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['CONFIRMED', 'CANCELLED']
    }

}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);