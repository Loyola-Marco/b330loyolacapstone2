// requiring the express dependency
const express = require("express");

// requiring the mongoose dependency
const mongoose = require("mongoose");

// require Routes
const userRoutes = require("./routes/userRoutes.js")
const productRoutes = require("./routes/productRoutes.js")

// requiring the corse dependecy
// allows our backend application to be available to our frontend application
// Allow us to control the app's Cross Origin Resource Sharing settings
const cors = require("cors");

// experiment to check
// const Course = require("./model/Product.js");
// const User = require("./model/User.js");

// set port v
const port = 4002;

// Create Server
const app = express();


mongoose.connect("mongodb+srv://admin:admin@batch330loyola.ecteawn.mongodb.net/Ecommerce_API?retryWrites=true&w=majority");

//  To test or check the status of the connection
let connect = mongoose.connection;

connect.on( "error", console.error.bind(console, "Connection error!"));

connect.once("open", () => {
	console.log("Connected with the db!");
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Allow all resources to access our backend application
app.use(cors());
app.use("/b2/users", userRoutes);
app.use("/b2/products", productRoutes);

// run the server to a specific port:
app.listen(port, () => {
	console.log(`API is now online on port ${port}!`);
})