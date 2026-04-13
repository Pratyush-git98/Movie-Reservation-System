import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
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
    bookedSeats: [Number],
    ticketPrice: {
        type: Number
    },
    isActive : {
        type: boolean,
        default: false
    }

}, { timestamps: true });

export const Show = mongoose.model('Show', showSchema);