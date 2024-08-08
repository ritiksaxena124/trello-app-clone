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
    await user.save({ validateBeforeSave: false });

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
    await User.findByIdAndUpdate({ _id: req.user?._id }, {
        $set: {
            refreshToken: ""
        }
    }, { new: true })


    const options = {
        httpOnly: true,
        secure: true
    }
    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User logged out successfully", {}));
})

const retrieveUserData = asyncHandler(async (req, res) => {

    const user = await User.aggregate(
        [
            {
                $match: {
                    _id: req.user?._id
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "userId",
                    as: "tasks"
                }
            },
            {
                $addFields: {
                    todoTasks: {
                        $filter: {
                            input: "$tasks",
                            as: "task",
                            cond: {
                                $eq: ["$$task.status", "Todo"]
                            }
                        }
                    },
                    inProgressTasks: {
                        $filter: {
                            input: "$tasks",
                            as: "task",
                            cond: {
                                $eq: ["$$task.status", "In Progress"]
                            }
                        }
                    },
                    underReviewTasks: {
                        $filter: {
                            input: "$tasks",
                            as: "task",
                            cond: {
                                $eq: ["$$task.status", "Under Review"]
                            }
                        }
                    },
                    finishedTasks: {
                        $filter: {
                            input: "$tasks",
                            as: "task",
                            cond: {
                                $eq: ["$$task.status", "Finished"]
                            }
                        }
                    },
                }
            },
            {
                $set: {
                    allTasks:
                        [
                            {
                                "status": "Todo",
                                "tasks": "$todoTasks"
                            },
                            {
                                "status": "In Progress",
                                "tasks": "$inProgressTasks"
                            },
                            {
                                "status": "Under Review",
                                "tasks": "$underReviewTasks"
                            },
                            {
                                "status": "Finished",
                                "tasks": "$finishedTasks"
                            },
                        ]
                }
            },
            {
                $project: {
                    fullName: 1,
                    email: 1,
                    allTasks: 1
                }
            }
        ]
    )
    
    if (!user) {
        res.status(500).json(new ApiError(500, "Failed to retrieve user data"));
    }
    res.status(201).json(new ApiResponse(201, "User data retrieved successfully", user[0]));
})

export { registerUser, logoutUser, loginUser, retrieveUserData };
