const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(
            (err) => {
                console.error('Error in asyncHandler:', err);
                next(err);
            });
};

export default asyncHandler