import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import apiError from '../utils/apiError.js';

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');

    if (users === null || users.length === 0) {
        throw new apiError(404, 'No users found');
    }

    res.status(200).json(
        new apiResponse(200, { users }, 'Users fetched successfully')
    );
});

const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
        throw new apiError(404, 'User not found');
    }

    res.status(200).json(
        new apiResponse(200, { user }, 'User profile fetched successfully')
    );
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { name, email } = req.body;

    if (!name || !email) {
        throw new apiError(400, 'Name and email are required');
    }

    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true }).select('-password');

    if (!user) {
        throw new apiError(404, 'User not found');
    }

    res.status(200).json(
        new apiResponse(200, { user }, 'User profile updated successfully')
    );
});

export default {
    getAllUsers,
    getUserProfile,
    updateUserProfile
};