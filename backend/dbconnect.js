const { mongoose } = require("mongoose");
const connectDB = async () => {
const MONTO_URL = "mongodb+srv://arjunmaurya9621192312:JYMXBOOW86oceUwt@cluster0.k9h10y2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  try {
    await mongoose.connect(MONTO_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};


module.exports = { connectDB };