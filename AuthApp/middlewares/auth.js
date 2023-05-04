
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try {
        console.log("cookie " , req.cookies.token);
        console.log("body " , req.body.token);
        console.log("header " , req.header("Authorization"));
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer " , "");

        if(!token || token === undefined) {
            res.status(400).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode); //decode ki body dekhne ke liye

            req.user = decode;
        }
        catch(e) {
            res.status(400).json({
                success: false,
                message: "Error in verifying token / invalid token",
            });
        }
        next();
    }
    catch(e) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}


exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student") {
            return res.status(400).json({
                success: false,
                message: "This is protected route for students",
            });
        }
        next()
    }
    catch(e){
        return res.status(400).json({
            success: false,
            message: "User role is not matching",
        });
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "This is protected route for admin",
            });
        }
        next();
    }
   
    catch(e){
       return res.status(400).json({
            success: false,
            message: "User role is not matching",
        });
    }
}