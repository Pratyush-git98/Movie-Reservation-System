import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    showTime: {
        type: Date,
        required: true
    },
    screenNumber: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
    },
    bookedSeats: [String],
    ticketPrice: {
        type: Number
    },
    isActive : {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export const Show = mongoose.model('Show', showSchema);