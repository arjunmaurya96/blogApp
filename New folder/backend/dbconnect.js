const { mongoose } = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://newarjunatlasuser:WMJOdPmy8xfKiQqN@blogclustor.0tkyiti.mongodb.net/?retryWrites=true&w=majority&appName=Blogclustor');
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};


module.exports = { connectDB };