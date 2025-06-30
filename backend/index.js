const express = require('express');
const app = express();
require("dotenv/config");
const cors = require('cors');
const mongoose = require("mongoose");

const productRoutes = require('./routes/product.routes');

app.use(express.json());
app.use(cors());

//cors
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));

 //mongoose
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Atlas connected"))
.catch((error) => console.error(error));

//api
app.use("/product", productRoutes);

//starting server
app.listen(process.env.PORT, () => console.log(`server - http://localhost:${process.env.PORT} , Frontend - ${process.env.FRONTEND_URL}`));