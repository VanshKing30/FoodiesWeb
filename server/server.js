const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config({path : ".env"});
const cors = require("cors");
var cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const cloudinaryConfig = require("./config/cloudinaryConfig");
const bodyParser = require('body-parser');

app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("*", cloudinaryConfig.cloudinaryConfig);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//mounting routes
const studentRoutes = require("./routes/student");
const canteenRoutes = require("./routes/canteen");
const uploadFileRouter = require("./routes/uploadFile");

app.use("/api/v1", canteenRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", uploadFileRouter);

app.listen(PORT, () => {
  console.log(`Server started succesfully at ${PORT}`);
});

//getting connected to databse
const dbConnect = require("./config/database");
dbConnect();

//default route
app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage baby</h1>`);
});
