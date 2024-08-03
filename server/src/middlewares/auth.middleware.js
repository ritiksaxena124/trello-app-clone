import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization");


    if (!token) {
        throw new ApiError(401, "Invalid token")
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid token");
    }

    req.user = user;

    next();
})

export { verifyJWT }