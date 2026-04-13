import User from '../models/user.model.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(
            new apiResponse(200, { users }, 'Users fetched successfully')
        );

    } catch (error) {
        throw new apiError('Failed to fetch users', 500);
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        res.status(200).json(
            new apiResponse(200, { user }, 'User profile fetched successfully')
        );
    } catch (error) {
        throw new apiError('Failed to fetch user profile', 500);
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true }).select('-password');

        res.status(200).json(
            new apiResponse(200, { user }, 'User profile updated successfully')
        );
    } catch (error) {
        throw new apiError('Failed to update user profile', 500);
    }
};

export default {
    getAllUsers,
    getUserProfile,
    updateUserProfile
};