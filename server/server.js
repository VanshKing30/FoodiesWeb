const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000

app.use(
    cors({
      origin: "*",
    })
);
express.urlencoded({ extended: true });
app.use(express.json());
//mounting routes
const studentRoutes = require("./routes/student"); 
const canteenRoutes = require("./routes/canteen");
app.use("/api/v1" , canteenRoutes);
app.use("/api/v1", studentRoutes);




app.listen(PORT , ()=>{
    console.log(`Server started succesfully at ${PORT}`);
});


//getting connected to databse
const dbConnect = require("./config/database");
dbConnect();


//default route
app.get("/" , (req,res)=>{
    res.send(`<h1>This is Homepage baby</h1>`);
})