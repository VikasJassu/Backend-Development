const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Connection established successfully"))
    .catch((error) =>{
        console.log("Error in Db connection");
        console.log(error);
        process.exit(1);
    })
};

module.exports = connectWithDb;