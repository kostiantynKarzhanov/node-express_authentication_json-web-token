const generalErrorHandler = (err, req, res, next) => {
    // delegate to the default Express error handler, when the headers have already been sent to the client
    if (res.headersSent) return next(err);

    console.error(err.stack);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
};

export default generalErrorHandler;