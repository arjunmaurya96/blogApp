const User = require("../models/UserModel");
const cloudinary = require("cloudinary")
const bcrypt = require("bcryptjs");
// const createTokenAndSaveCookies = require("../jwt/AuthToken");
const createTokenAndSave = require("../jwt/AuthToken")

const register = async (req, res) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User Photo is required" })
        }
        const { photo } = req.files;
        const allowedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"]

        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
        }
        const { email, name, password, phone, education, role } = req.body;

        if (!email || !name || !password || !phone || !education || !role || !photo) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({ message: "User already exists with this email" });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);

        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashPass,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            }
        });
        await newUser.save();
        if (newUser) {
            let token = await createTokenAndSave(newUser._id, res)
            console.log("register token", token);

            return res.status(201).json({ message: "User registered successfully", newUser, token });
        }


    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }
        const user = await User.findOne({ email }).select("+password");
        // console.log(user.password)
        if (!user.password) {
            return res.status(400).json({ message: "User passwrod is missing" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        if (user.role !== role) {
            return res.status(400).json({ message: `Given role ${role} not found` });
        }
        const token = await createTokenAndSave(user._id, res);
        // console.log("this is login token", token)
        res.status(200).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
}

// const logout = (req, res) => {
//     try {
//         res.clearCookie("jwt", { httpOnly: true });
//         res.status(200).json({ message: "User Logged out successfully" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

const logout = (req, res) => {
    try {
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = logout;



const getMyProfile = async (req, res) => {
    try {
        const user = await req.user;
        console.log("user data hello dummy", user)
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })


    }
}

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" })
        res.status(200).json(admins)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" })


    }
}
module.exports = {
    register: register,
    login: login,
    logout: logout,
    getMyProfile: getMyProfile,
    getAdmins: getAdmins
};
