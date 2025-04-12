const { register, login, logout, getMyProfile, getAdmins } = require("../controllers/UserController");
const { isAuthenticated } = require("../middleware/authUser");


const router = require("express").Router();

router.post("/register", register)
router.post("/login",login)
router.get("/logout", isAuthenticated ,logout)
router.get("/myprofile",isAuthenticated, getMyProfile)
router.get("/admins", getAdmins)

 
module.exports = router;