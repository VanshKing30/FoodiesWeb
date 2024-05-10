const bcrypt = require("bcrypt");
const User = require("../models/studentLoginInfo");
const jwt = require("jsonwebtoken");
const Canteen = require("../models/canteenLoginInfo");
const { sendVerificationEmail } = require("../utils/email");
const { successFullVerification, tokenExpired } = require("../utils/emailTemplate");

require("dotenv").config();

exports.studentSignup = async (req , res)=>{
    try{
        const {name , email ,   collegeName , accountType ,  password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User alredy exist"
            });
        }

        let hashedPassword;

        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success : false,
                message : "Error in hashing password",
            })
        }

        if(process.env.ENABLE_EMAIL_VERIFICATION){
            console.log("Email Verification is enabled");
            const user = await User.create({
                name , email , collegeName,accountType , password:hashedPassword
            });
    
            const verificationToken = jwt.sign({email:email, accountType: accountType},process.env.JWT_SECRET,{expiresIn:'1d'});
    
            await sendVerificationEmail(email,verificationToken,name);
    
    
            return res.status(200).json({
                success : true,
                message: `User created succesfully, Verification email has been sent to ${email}`
            });
        }else{
            console.log("Email Verification is disabled");
            const user = await User.create({
                name , email , collegeName,accountType , password:hashedPassword, isVerified:true
            });
    
            return res.status(200).json({
                success : true,
                message : "User created succesfully"
            });
        }


    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "USer can not be registred"
        });
    }
}


exports.studentLogin = async (req , res)=>{
    try{
        const {email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please Fill all the deatils"
            });
        }

        

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User is not registred"
            })
        }

        if(process.env.ENABLE_EMAIL_VERIFICATION && !user.isVerified){
            return res.status(401).json({
                success : false,
                message : `${user.name} please verify your email to login`
            })
        }

        const payload = {
            email : user.email,
            id : user._id,
            accountType : user.accountType,
        };

        if(await bcrypt.compare(password , user.password)){
            let token = jwt.sign(payload ,
                process.env.JWT_SECRET,
                {
                    expiresIn : "2h",
                });
                user = user.toObject();
                user.token = token;
                user.password = undefined;
                console.log(user);

                const options = {
                    expires : new Date(Date.now() + 3 *24 *60 *60*1000),
                    httpOnly : true,
                }

                res.cookie("token" , token , options).status(200).json({
                    success : true,
                    token,
                    user,
                    message : "User logged in succesfully"
                });
        }
        else{
            return res.status(403).json({
                success : false,
                message : "Pasword Incorrect"
            });
        }
    }

    catch(error){

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Login failure",
        })
    }
}


exports.verifyemail = async (req, res) => {
    try {
        const {verificationToken} = req.params;
        
        const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);

        if (!decoded) {
            return res.send(tokenExpired);
        }

        const email = decoded.email;

        let verfication;

        if(decoded.accountType === "User"){
            verfication = await User.findOne({email
            });
        }else{
            verfication = await Canteen.findOne({email  
            });
        }

        if (!verfication) {
            return res.status(404).json({ error: 'User not found' });
        }

        verfication.isVerified = true;

        await verfication.save();



        res.send(successFullVerification(verfication.name));

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during email verification.' });
        console.log(error);
    }
};


exports.resendVerificationEmail = async (req, res) => {

    try {
        const { email, accountType } = req.body;

        let user;

        if(accountType === "User"){

            user = await User
            .findOne({ email, accountType });

        }else{
            user = await Canteen
            .findOne({ email, accountType });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await sendVerificationEmail(email, verificationToken, user.name);

        res.status(200).json({ message: `Verification email has been sent to ${email}` });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred during email verification.' });
        console.log(error);
    }
};

//for canteens

exports.canteenSignup = async (req , res)=>{
    
    try{
        const {name , email ,   collegeName , accountType ,  password} = req.body;
        const existingCanteen = await Canteen.findOne({email});



        if(existingCanteen){
            return res.status(400).json({
                success : false,
                message : "User alredy exist"
            });
        }

        let hashedPassword;

        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success : false,
                message : "Error in hashing password",
            })
        }

        if(process.env.ENABLE_EMAIL_VERIFICATION){
            console.log("Email Verification is enabled");
            const canteen = await Canteen.create({
                name , email , collegeName,accountType , password:hashedPassword
            });
    
            const verificationToken = jwt.sign({email:email, accountType: accountType},process.env.JWT_SECRET,{expiresIn:'1d'});
    
            await sendVerificationEmail(email,verificationToken,name);
    
    
            return res.status(200).json({
                success : true,
                message: `Canteen created succesfully, Verification email has been sent to ${email}`
            });
        }else{
            console.log("Email Verification is disabled");
            const canteen = await Canteen.create({
                name , email , collegeName,accountType , password:hashedPassword, isVerified:true
            });
    
            return res.status(200).json({
                success : true,
                message : "Canteen created succesfully"
            });
        }


    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "USer can not be registred"
        });
    }
}


exports.canteenLogin = async (req , res)=>{

    
    try{
        const {email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please Fill all the deatils"
            });
        }

        

        let canteen = await Canteen.findOne({email});
        if(!canteen){
            return res.status(401).json({
                success : false,
                message : " Canteen is not registred"
            })
        }

        if(process.env.ENABLE_EMAIL_VERIFICATION && !canteen.isVerified){
            return res.status(401).json({
                success : false,
                message : `${canteen.name} please verify your email to login`
            })
        }

        const payload = {
            email : canteen.email,
            id : canteen._id,
            accountType : canteen.accountType,
        };

        if(await bcrypt.compare(password , canteen.password)){
            let token = jwt.sign(payload ,
                process.env.JWT_SECRET,
                {
                    expiresIn : "2h",
                });
                canteen = canteen.toObject();
                canteen.token = token;
                console.log(canteen);
                canteen.password = undefined;
                console.log(canteen);

                const options = {
                    expires : new Date(Date.now() + 3 *24 *60 *60*1000),
                    httpOnly : true,
                }

                res.cookie("token" , token , options).status(200).json({
                    success : true,
                    token,
                    canteen,
                    message : "Canteen logged in succesfully",
                    cantId : canteen._id,
                });
        }
        else{
            return res.status(403).json({
                success : false,
                message : "Pasword Incorrect"
            });
        }
    }

    catch(error){

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Login failure",
        })
    }
}




