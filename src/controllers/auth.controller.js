import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const generateToken = async (userId) => {
    const user = await User.findById(userId);
    const token = user.createToken();
    return token;
}

const register = asyncHandler(async (req, res) => {
    // if (!req.body || Object.keys(req.body).length === 0) {
    //     throw new apiError(400, 'Request body is empty');
    // }

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
        role: role === 'admin' ? 'admin' : 'user',
    });

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    res
        .status(201)
        .json(
            new apiResponse(201, { user: userResponse }, 'User registered successfully')
        );
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, 'Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(404, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new apiError(401, 'Invalid password');
    }

    const token = await generateToken(user._id);

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie('token', token, options)
        .json(
            new apiResponse(200, { token, user: userResponse }, 'Login successful')
        );
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                token: undefined
            }
        },
        {
            returnDocument: 'after'
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(
            new apiResponse(200, null, "User logged out successfully")
        )
});

export {
    register,
    login,
    logout
};