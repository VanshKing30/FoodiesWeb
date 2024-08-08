const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinaryConfig = require("./config/cloudinaryConfig");
const contactRoutes = require("./routes/contactRoutes");
const studentRoutes = require("./routes/student");
const canteenRoutes = require("./routes/canteen");
const uploadFileRouter = require("./routes/uploadFile");
const otpRoute = require("./routes/otpRoute");
const dbConnect = require("./config/database");

const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Adjust this to match your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cloudinary Config
app.use("*", cloudinaryConfig.cloudinaryConfig);

// Mounting Routes
app.use("/api/v1", canteenRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", uploadFileRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/v1/otp", otpRoute);

// Default Route
app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage baby</h1>`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

// Database Connection
dbConnect();
