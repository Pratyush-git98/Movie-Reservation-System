const errorMiddleware = (err, req, res, next) => {
    let statuscode = err.statuscode || 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
        statuscode = 400;
        message = `Resource not found. Invalid: ${err.path}: ${err.value}`;
    }

    if (err==="MongoError" || err.code === 11000) {
        statuscode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate field value entered for ${field}: ${err.keyValue[field]}. Please use another value!`;
    }

    if (err.name === 'ValidationError') {
        statuscode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    if (err.name === 'JsonWebTokenError') {
        statuscode = 401;
        message = 'Invalid token. Please log in again!';
    }

    if (err.name === 'TokenExpiredError') {
        statuscode = 401;
        message = 'Your token has expired! Please log in again.';
    }

    if (err.name === 'MulterError') {
        statuscode = 400;
        message = `Multer error: ${err.message}`;
    }

    if (err.name === 'SyntaxError' && err.status === 400) {
        statuscode = 400;
        message = 'Invalid JSON payload';
    }

    // console.error(err.stack);
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    });
}

export {errorMiddleware}