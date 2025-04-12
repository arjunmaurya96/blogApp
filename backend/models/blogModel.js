const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },

    blogimage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
        minlenght: [200, "Should contain atleast 200 charactor"]
    },
    adminname: {
        type: String,
        // minlength: 8,
        // select: false
    },
    adminphoto: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    }

})

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;