import User from "../models/userModel";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    // check if any user with same email exists already
    const existingUser = await User.findOne({
        email
    })

    if (existingUser) {
        return res.status(400).json(new ApiError(409, "User already exists"));
    }

    // Create a new user
    const user = await User.create({
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password");

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // return response
    res.status(201).json(new ApiResponse(201, "User registered successfully", createdUser));
});

export { registerUser };


