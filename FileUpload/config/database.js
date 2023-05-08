
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        console.log("Connection with database is successful")
    )
    .catch( (error) => {
        console.log("Problem in database connection");
        console.error(error);
        process.exit(1);
    });
}