const asyncHandler = (reqHandler) => {
    return async (req, res, next) => {
        try {
            await reqHandler(req, res, next);
        } catch (error) {
            res.status(error.code || 500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export { asyncHandler };