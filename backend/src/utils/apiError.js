class apiError extends Error {
    constructor(statuscode, message = 'something went wrong', error = [], stack = '') {
        super(message);
        (this.statuscode = statuscode),
            (this.message = message),
            (this.error = error),
            (this.stack = stack);
        if (stack) {
            this.stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { apiError };
