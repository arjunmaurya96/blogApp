const { default: mongoose } = require("mongoose");
const Blog = require("../models/blogModel")
const cloudinary = require("cloudinary")

const createBlog = async (req, res) => {
    try {
        const { title, category, about, blogImage } = req.body;
        console.log({ title, category, about })
        // ✅ Validate required fields
        if (!title || !category || !about || !blogImage) {
            return res.status(400).json({ message: "Title, category, about, and blog image are required fields" });
        }

        // ✅ Validate base64 format
        const base64Pattern = /^data:image\/(png|jpe?g|webp);base64,/;
        if (!base64Pattern.test(blogImage)) {
            return res.status(400).json({ message: "Invalid image format. Only jpg, png, and webp are allowed" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage, {
            folder: "blogs", 
            resource_type: "image",
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error:", cloudinaryResponse.error);
            return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        }

        const adminname = req?.user?.name;
        const adminphoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;

        const blogData = {
            title,
            about,
            category,
            adminname,
            adminphoto,
            createdBy,
            blogimage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url, // Use secure URL
            },
        };

        const blog = await Blog.create(blogData);

        return res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        // console.log("i am arjun", blog)
        if (!blog) {
            return res.status(404).json({ message: "Blogs not found" });
        }
        await blog.deleteOne();
        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        // console.log("Fetched all blogs:", allBlogs);

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: allBlogs
        });
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message
        });
    }
};


const getSingleBlogs = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Blog id" })
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(401).json({ message: "Blog not found" })
        }
        res.status(200).json(blog)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server error " })

    }

}


const myBlogs = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const myBlogs = await Blog.find({ createdBy });
        res.status(200).json(myBlogs)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

const updateBlogs = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Blog id" })
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        res.status(200).json(updatedBlog)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })

    }

}



module.exports = {
    createBlog: createBlog,
    deleteBlog: deleteBlog,
    getAllBlogs: getAllBlogs,
    getSingleBlogs: getSingleBlogs,
    myBlogs: myBlogs,
    updateBlogs: updateBlogs
}