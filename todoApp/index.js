
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes for TODO api
const todoRoutes = require("./routes/todos");
// const gett   = require("./routes/getTodo");

//mount todo api with apiv1
app.use("/api/v1" , todoRoutes);
// app.use("/api/v1" , getTodo);

//starting server

app.listen(PORT , () => {
    console.log(`server started successfully at ${PORT}`);
})

//connect to database
const dbConnect = require("./config/database");
dbConnect();

//default route
app.get("/" , (req,res) => {
    res.send(`<h1>This is homepage</h1>`);
})