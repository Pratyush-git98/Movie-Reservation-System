import { Theatre } from "../models/theatre.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const createTheater = asyncHandler(async (req, res) => {
    const { name, city, address, screens } = req.body;

    if (!name || !city || !address) {
        throw new apiError(400, "Name, city and address are required");
    }

    const theater = await Theatre.create({
        name,
        city,
        address,
        screens
    });

    return res
        .status(201)
        .json(new apiResponse(201, theater, "Theater created successfully"));
});

const getAllTheaters = asyncHandler(async (req, res) => {
    const theaters = await Theatre.find();
    return res
        .status(200)
        .json(new apiResponse(200, theaters, "Theaters fetched successfully"));
});

const getTheaterById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const theater = await Theatre.findById(id);

    if (!theater) {
        throw new apiError(404, "Theater not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, theater, "Theater fetched successfully"));
});

const updateTheater = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, city, address, screens } = req.body;

    if (!name || !city || !address) {
        throw new apiError(400, "Name, city and address are required");
    }

    const theater = await Theatre.findByIdAndUpdate(
        id,
        { name, city, address, screens },
        { new: true }
    );

    if (!theater) {
        throw new apiError(404, "Theater not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, theater, "Theater updated successfully"));
});

const deleteTheater = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const theater = await Theatre.findByIdAndDelete(id);

    if (!theater) {
        throw new apiError(404, "Theater not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, null, "Theater deleted successfully"));
});

export {
    createTheater,
    getAllTheaters,
    getTheaterById,
    updateTheater,
    deleteTheater
}