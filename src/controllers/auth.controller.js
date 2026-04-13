import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import apiResponse from '../utils/apiResponse.js';
import apiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
}

const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        throw new apiError(400, 'Please provide all required fields');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new apiError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role === 'admin' ? 'admin' : 'user'
    });

    const token = generateToken({ user });

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    res.status(201).json(
        new apiResponse(201, { token, user: userResponse }, 'User registered successfully')
    );
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(404, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new apiError(401, 'Invalid credentials');
    }

    const token = generateToken({ user });

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    res.status(200).json(
        new apiResponse(200, { token, user: userResponse }, 'Login successful')
    );
});

const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
        throw new apiError(404, 'User not found');
    }

    res.status(200).json(
        new apiResponse(200, { user }, 'User found')
    );
});

export default {
    register,
    login,
    getMe
};