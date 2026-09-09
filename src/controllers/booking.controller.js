import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Show } from "../models/show.model.js";
import { Booking } from "../models/booking.model.js";

const createBooking = asyncHandler(async (req, res) => {
    const { showId, seats } = req.body;

    if (!showId || !seats || seats.length === 0) {
        throw new apiError(400, "Show ID and Seats are required");
    }

    const show = await Show.findOneAndUpdate(
       { _id : showId,
        isActive : true,
        bookedSeats : { $not: { $elemMatch: { $in: seats } } } },
        { $push: { bookedSeats: { $each: seats } } },
        { returnDocument: 'after' }
       
    );

    if (!show) {
        const existingShow = await Show.findById(showId);
        if (!existingShow) {
            throw new apiError(404, "Show not found");
        }
        throw new apiError(404, "Seats already booked");
    }

    const totalAmount = seats.length * show.ticketPrice;

    const booking = await Booking.create({
        show: showId,
        user: req.user._id,
        seats,
        totalAmount,
        status: "CONFIRMED"
    });

    return res
        .status(201)
        .json(
            new apiResponse(201, booking, "Booking created successfully")
        );
});

const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find()
        .populate('user', 'name email')
        .populate({
            path: 'show',
            populate: {
                path: 'movie',
                select: 'title'
            }
        }
        ).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new apiResponse(200, bookings, "All bookings retrieved successfully")
        );
});

const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate('user', 'name email')
        .populate({
            path: 'show',
            populate: [
                { path: 'movie', select: 'title posterUrl duration' },
                // { path: 'theater', select: 'name city' }
            ]
        })
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new apiResponse(200, bookings, "My bookings retrieved successfully")
        );
});

const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id)
        .populate({
            path: 'show',
            populate: [
                { path: 'movie', select: 'title posterUrl duration language' },
                // { path: 'theater', select: 'name city address' }
            ],
        })
        .sort({ createdAt: -1 });

    if (!booking) {
        throw new apiError(404, "Booking not found");
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new apiError(403, 'Not authorized to view this booking');
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, booking, "Booking retrieved successfully")
        );
});

const cancelBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
        throw new apiError(404, "Booking not found");
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
        throw new apiError(403, 'Not authorized to cancel this booking');
    }

    if (booking.status === 'CANCELLED') {
        throw new apiError(400, 'Booking is already cancelled');
    }

    await Show.findByIdAndUpdate(booking.show, {
        $pull: { bookedSeats: { $in: booking.seats } }  
    });

    booking.status = 'CANCELLED';
    await booking.save();

    return res
    .status(200)
    .json(
        new apiResponse(200, booking, "Booking cancelled successfully")
    );
});

    export {
        createBooking,
        getAllBookings,
        getMyBookings,
        getBookingById,
        cancelBooking
    }