import { Movie } from "../models/movie.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const createMovie = asyncHandler(async (req, res) => {
    const { title, description, genre, duration, language, rating, posterUrl } = req.body;

    if (!title) {
        throw new apiError(400, 'Title is required');
    }

    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
        throw new apiError(400, 'Movie with this title already exists');
    }

    const movie = await Movie.create({
        title,
        description,
        genre,
        duration,
        language,
        rating,
        posterUrl
    });

    return res
        .status(201)
        .json(new apiResponse(201, movie, 'Movie created successfully'));

});

const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({ isActive: true });

    if (movies.length === 0) {
        throw new apiError(404, 'No movies found');
    }

    return res
        .status(200)
        .json(new apiResponse(200, movies, 'Movies retrieved successfully'));
});

const getMovieById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
        throw new apiError(404, 'Movie not found');
    }

    return res
        .status(200)
        .json(new apiResponse(200, movie, 'Movie retrieved successfully'));
});

const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, genre, duration, language, rating, posterUrl } = req.body;

    const movie = await Movie.findByIdAndUpdate(
        id,
        { title, description, genre, duration, language, rating, posterUrl },
        { new: true }
    );

    if (!movie) {
        throw new apiError(404, 'Movie not found');
    }

    return res
        .status(200)
        .json(new apiResponse(200, movie, 'Movie updated successfully'));
});

const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
        throw new apiError(404, 'Movie not found');
    }

    return res
        .status(200)
        .json(new apiResponse(200, null, 'Movie deleted successfully'));
});

export {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
}