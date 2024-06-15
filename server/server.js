const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000; //originally 4000 tha
const cloudinaryConfig = require("./config/cloudinaryConfig");
const contactRoutes = require('./routes/contactRoutes');
const bodyParser = require('body-parser');


app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("*", cloudinaryConfig.cloudinaryConfig);

//mounting routes
const studentRoutes = require("./routes/student");
const canteenRoutes = require("./routes/canteen");
const uploadFileRouter = require("./routes/uploadFile");

app.use("/api/v1", canteenRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", uploadFileRouter);
app.use('/api/contact', contactRoutes);

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
