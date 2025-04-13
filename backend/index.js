const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/UserRoute");
const blogRoute = require("./routes/BlogRoute");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const { connectDB } = require("./dbconnect")
connectDB();

// ✅ Middleware Configuration
// app.use(
  //   cors({
    //     origin: "http://localhost:5173",
//     // origin:process.env.FRONTEND_URL,
//     // origin: "https://blogapp-83fo.onrender.com",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );




const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-two-wine.vercel.app/" ,
  process.env.FRONTEND_URL, 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Increase Payload Limit to 100MB
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  })
);

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// ✅ Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// ✅ 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ✅ Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running on ${port}`);
});
