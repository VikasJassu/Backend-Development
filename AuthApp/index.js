const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());  

app.use(express.json());

require("./config/database").connectDB();

const userRoute = require("./routes/user");
app.use("/api/v1" , userRoute);


app.listen(PORT , () => {
    console.log(`server started at ${PORT}`);
});


app.get("/" , () => {
    res.send(`<h1>this is my homepage</h1>`);
})
