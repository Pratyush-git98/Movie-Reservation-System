import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    genre: [String],
    duration: {
        type: Number,
    },
    language: {
        type: String,
    },
    rating: {
        type: Number,
    },                 // 1–10
    posterUrl: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Movie = mongoose.model('Movie', movieSchema);