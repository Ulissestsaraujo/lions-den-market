// Import necessary modules
const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/userService');

// Authentication middleware
const authenticate = async (req, res, next) => {
    try {
        // Check if Authorization header is present
        const token = req.headers.authorization;
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            console.log('Token:', token); // Log the token to check if it's present



            // Verify the JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('Decoded Token:', decoded); // Log the decoded token

            // Check if the user exists in the database
            const user = await findUserById(decoded.userId);
            if (!user) {
                console.log('Invalid token:', decoded);
                return res.status(401).json({ message: 'Unauthorized: Invalid token', user: JSON.stringify(decoded) });
            }

            // Attach the user object to the request for further processing
            req.user = user;

            // Move to the next middleware or route handler
            next();
        }
    } catch (error) {
        console.error('Error during token verification:', error); // Log any errors during token verification
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { authenticate };