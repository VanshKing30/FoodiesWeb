const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>console.log("DB CONNECTION IS SUCCESSFULL"))
    .catch((error)=>{
        console.log('ISSUE IN DB CONNECTION');
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;