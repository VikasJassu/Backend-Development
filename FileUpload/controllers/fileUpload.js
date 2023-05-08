const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req , res) => {
    try {
        const file = req.files.file;
        console.log("file aa gyi" , file);

        //create path where file is going to upload on server

        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path -> " , path);

        file.mv(path , (error) => {
            console.log(error);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully",
        });
    }
    catch(err) {
        console.log("Not able to upload file on server");
        console.log(err);
    }
}


//upload image on cloudinary

function isSupported(fileType,supportedTypes , fileSize) {
    const validSize = 5242880;
    if(fileSize > validSize){
        console.log("File size exceeds");
        return false;
    }
       
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file , folder , quality) {
    const options = {folder};
    console.log("temp file ka path" , file.tempFilePath);
    options.resource_type = "auto";

    if(quality) {
        options.quality = quality;
    }
  
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

exports.imageUpload = async (req,res) => {
    try {

        const {name ,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
 
        if(!isSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const response = await uploadFileToCloudinary(file , "TestingFolder");
        console.log(response);

        //db mein data ki entry 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });
        
        res.json({
            success: true,
            message: "File uploaded to cloudinary"
        });

    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error in file uploading"
        });
    }
}

//upload video

exports.videoUpload = async (req,res) => {
    try {

        const {name ,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4" , "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        let fileSize = file.size;
        console.log( "size of video is ->",fileSize)
        
 
        if(!isSupported(fileType,supportedTypes , fileSize )) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }
        
        let response = await uploadFileToCloudinary(file , "TestingFolder");
        console.log(response);

        //db mein data ki entry 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });
        
        res.json({
            success: true,
            message: "video uploaded to cloudinary"
        });

    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error in file uploading"
        });
    }
}


//reduced file size

exports.reducedImageUpload = async (req,res) => {
    try {

        const {name ,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
 
        if(!isSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const response = await uploadFileToCloudinary(file , "TestingFolder" , 80);
        console.log(response);

        //db mein data ki entry 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });
        
        res.json({
            success: true,
            message: "File uploaded to cloudinary"
        });

    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error in file uploading"
        });
    }
}