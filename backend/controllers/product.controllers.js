const ProductModel = require('../models/product.models');

const addproduct = async(req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        console.log("Add Product api hit");
        res.status(200).json({ message: "Product Added", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
}

const productControllers = {
    addproduct
};

module.exports = productControllers;