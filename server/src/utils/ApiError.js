class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;
        this.data = null;
    
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }