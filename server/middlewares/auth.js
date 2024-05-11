const Canteen = require("../models/canteenLoginInfo");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req?.header("Authorization")||  req?.header("Authorisation")?.replace("Bearer ", "")  || req?.headers?.cookie.split("=")[1] || req.body.token ;
        
        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }
        
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //now check that user present in db or not
            const user = await Canteen.findById(decode.id);
            if (!user)
                return res.status(500).json({
                    success: false,
                    message: "invalid user ! try to  login again"
                })
            req.user = user;
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: `Something went wrong while validating the token ${error.message}`,
        });
    }
}


//isCanteen(canteen manager) account type
exports.isCanteen = async (req, res, next) => {
    try {
        console.log("isCanteen middleware",req.user);
        if (req.user.accountType !== "Canteen") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
                data: req.user
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}