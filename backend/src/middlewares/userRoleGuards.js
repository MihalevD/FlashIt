export default (role) => async (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({
            message: 'You\'re not authorized to do that!'
        });
    }
    next();
};