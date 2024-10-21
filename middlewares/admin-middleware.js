const adminMiddleware = async (req, res, next) => {
    try {
        // Check if req.user exists before accessing properties
        if (!req.user || typeof req.user.isAdmin === 'undefined') {
            return res.status(401).json({ message: "Unauthorized. User information is missing." });
        }

        // Check if the user has admin role
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. You are not an admin." });
        }

        // If the user is an admin, proceed to the next middleware
        next();

    } catch (error) {
        // Log error for debugging purposes
        console.error("Error in adminMiddleware:", error);

        // Forward the error to the global error handler
        next(error);
    }
};

module.exports = adminMiddleware;
