const { createBlog, deleteBlog, getAllBlogs, getSingleBlogs, myBlogs, updateBlogs } = require("../controllers/BlogController");
const { isAuthenticated, isAdmin } = require("../middleware/authUser");


const router = require("express").Router();

router.post("/create",isAuthenticated, isAdmin("admin")  ,createBlog)
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog);
router.get("/allblogs",  getAllBlogs)
router.get("/singleblog/:id" , isAuthenticated, getSingleBlogs )
router.get("/getmyblog", isAuthenticated, myBlogs)
router.put("/updateblog/:id", isAuthenticated, isAdmin("admin"), updateBlogs)



module.exports = router;