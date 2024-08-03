import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
}

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

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // return response
    res.status(201).json(new ApiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if any user with the email recieved exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
        return res.status(401).json(new ApiResponse(401, "Incorrect credentials"));
    }

    // check if password recieved is correct
    const isPasswordCorrect = await userExists.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(401).json(new ApiResponse(401, "Incorrect credentials"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userExists._id);

    const user = await User.findById(userExists._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(201, "User logged in successfully", {
            user,
            accessToken, refreshToken
        }));
})

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json(new ApiResponse(200, "User logged out successfully"));
})

const retrieveUserData = asyncHandler(async (req, res) => {
    const token = req.headers.cookie?.replace("token=", "");
    if (!token) {
        return res.status(401).json(new ApiError(401, "Unauthorized access"))
    }
    const blob = jwt.verify(token, process.env.JWT_SECRET);

    if (!blob) {
        return res.status(401).json(new ApiError(401, "Unauthorized access"))
    }

    const user = await User.findById({
        _id: blob.id,
    }).populate("tasksData").select("-password");

    if (!user) {
        res.status(500).json(new ApiError(500, "Failed to retrieve user data"));
    }
    res.status(201).json(new ApiResponse(201, "User data retrieved successfully", user));
})

export { registerUser, logoutUser, loginUser, retrieveUserData };
