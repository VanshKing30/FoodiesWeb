const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const cloudinaryConfig = require("./config/cloudinaryConfig");

app.use(
  cors({
    origin: "*",
  })
);
express.urlencoded({ extended: true });
app.use(express.json());

app.use("*", cloudinaryConfig.cloudinaryConfig);


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
