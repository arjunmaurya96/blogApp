const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Authentication 
// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         // console.log(req.cookies, "this is requrest beta");
//         if (!token) {
//             return res.status(401).json({ message: "User not authenticated" });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         const user = await User.findById(decoded.userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" })
//         }
//         // console.log("user hai ", user)
//         req.user = user;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "User is not Authenticated" })
//     }
// }


const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Authorization 
const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: `User with given role ${req.user.role} not allowed` })
        }
        next();
    }
}


module.exports = {
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin
}