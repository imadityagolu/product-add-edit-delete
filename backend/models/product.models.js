const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type: String,
    },
    price: {
        type: Number,
    }
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;