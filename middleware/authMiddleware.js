const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save decoded data to request
        req.user = decoded; // decoded should have userId or email etc.
        
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
