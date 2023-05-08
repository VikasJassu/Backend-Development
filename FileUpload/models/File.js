const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
});

//sending mail

fileSchema.post("save" , async function(doc) {
    try{

        console.log("doc => " , doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        //now send mail

        let info = await transporter.sendMail({
            from: `Vikas Jassu`,
            to: doc.email,
            subject: "Image uploaded successfully",
            html: `<h2>Hello jii</h2> <p>View uploaded file here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        });

        console.log("Info => ",info);

    }
    catch(error){
        console.log(error);
    }
});


const File = mongoose.model("File" , fileSchema);
module.exports = File;