const mongoose = require("mongoose");
require('dotenv').config({ path: '../.env' });

// process.env.DATABASE_URL

const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>{
        console.log("Inside THEN");
        console.log("DB CONNECTION IS SUCCESSFULL")})
    .catch((error)=>{
        console.log('ISSUE IN DB CONNECTION');
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;