import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Show } from "../models/show.model.js";
import { Theatre } from "../models/theatre.model.js";
import { Movie } from "../models/movie.model.js";

const createShow = asyncHandler(async (req, res) => {
    const { movie, theatre, screenNumber, showTime, ticketPrice } = req.body;

    if (!movie || !theatre || !screenNumber || !showTime || !ticketPrice) {
        throw new apiError(400, "All fields are required");
    }

    const newTheatre = await Theatre.findOne({ name: theatre });
    if (!newTheatre) {
        throw new apiError(404, "Theatre not found");
    }

    const newMovie = await Movie.findOne({ title: movie });
    if (!newMovie) {
        throw new apiError(404, "Movie not found");
    }

    const screen = newTheatre.screens.find(screen => screen.screenNumber === screenNumber);
    if (!screen) {
        throw new apiError(404, "Screen not found in the specified theatre");
    }

    const show = await Show.create({
        movie: newMovie._id,
        theatre: newTheatre._id,
        screenNumber,
        showTime,
        ticketPrice,
        totalSeats: screen.seatCount,
        bookedSeats: [],
    });

    return res
        .status(201)
        .json(new apiResponse(201, show, "Show created successfully"));
});

const getAllShows = asyncHandler(async (req, res) => {
    const { movie, theatre, date } = req.query;
    const filter = { isActive: false };

    if (movie) filter.movie = movie;
    if (theatre) filter.theatre = theatre;

    if (date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        filter.showTime = { $gte: start, $lte: end };
    }

    const shows = await Show.find(filter)
        .populate("movie", "title")
        .populate("theatre", "name");

    if (shows.length === 0) {
        throw new apiError(404, "No shows found for the given criteria");
    }

    return res
        .status(200)
        .json(new apiResponse(200, shows, "Shows retrieved successfully"));
});

const getShowById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id)
        .populate("movie", "title duration language posterUrl")
        .populate("theatre", "name city address");

    if (!show) {
        throw new apiError(404, "Show not found");
    }

    const totalSeats = show.totalSeats - show.bookedSeats.length;

    return res
        .status(200)
        .json(new apiResponse(200, {
            ...show.toObject(),
            totalSeats
        }, "Show retrieved successfully"));
});

const toggleShow = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const show = await Show.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
        
    )
    if (!show) {
        throw new apiError(404, "Show not found");
    }
    return res
        .status(200)
        .json(new apiResponse(200, show, "Show updated successfully"));
});

export { createShow, getAllShows, getShowById, toggleShow };