const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    // Get token from Authorization header
    const token = req.header("Authorization");

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    // Remove 'Bearer ' prefix from token if present
    const jwtToken = token.replace("Bearer ", "").trim();

    console.log("Token after trimming:", jwtToken);

    try {
        // Verify the JWT token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECTION_KEY);
        
        // Find user by email in the payload
        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });

        // If user not found
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user data and token to request object
        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = authMiddleware;
