// const jwt = require("jsonwebtoken");
// const User = require("../models/UserModel");

// const createTokenAndSaveCookies = async (userId, res) => {
//     try {
//         // Generate JWT Token
//         const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
//             expiresIn: "15d", // Token expiration
//         });

//         // Set the JWT token as an HTTP-only cookie
//         res.cookie("jwt", token, {
//             httpOnly: true, // Prevents client-side JavaScript access
//             secure: process.env.NODE_ENV === "production", // Enables secure cookies in production
//             sameSite: "strict", // Protects against CSRF
//             maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
//         });

//         // Update the user's record in the database with the new token
//         await User.findByIdAndUpdate(userId, { token }, { new: true });

//         console.log("Token created and saved in cookies:", token);
//         return token;
//     } catch (error) {
//         console.error("Error creating token and saving cookies:", error.message);
//         throw new Error("Failed to create token and save cookies");
//     }
// };

// module.exports = createTokenAndSaveCookies;



const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const createTokenAndSave = async (userId) => {
    try {
        // Generate JWT Token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15d", // Token expiration
        });

        // Update the user's record in the database with the new token
        await User.findByIdAndUpdate(userId, { token }, { new: true });

        // console.log("Token created:", token);
        return token; // Send token to frontend
    } catch (error) {
        console.error("Error creating token:", error.message);
        throw new Error("Failed to create token");
    }
};

module.exports = createTokenAndSave;
