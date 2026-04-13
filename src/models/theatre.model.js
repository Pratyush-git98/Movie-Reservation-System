import mongoose from 'mongoose';

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    screens: [
        {
            screenNumber: Number,
            totalSeats: Number,
            rows: Number,
            seatsPerRow: Number
        }
    ]

}, { timestamps: true });

export const Theatre = mongoose.model('Theatre', theatreSchema);