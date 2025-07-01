const ProductModel = require('../models/product.models');

const addproduct = async(req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        console.log("Add Product api hit");
        res.status(200).json({ alert: "Product Added in Database", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product in Database", error: error.message });
    }
}

const listProduct = async(req, res) => {
    try{
        const product = await ProductModel.find();
        res.status(200).json(product);
    } catch(error) {
        console.log("Error while listing products : ", error);
        res.status(500).json({ message: "Failed to list products ", error: error.message });
    }
}

const deleteProduct = async(req, res) => {
    try{
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({ error: 'Product not found'});
        }
        console.log("Delete Product api hit");
        res.status(200).json({ alert: 'Product Deleted from Database'});
    } catch(error){
        console.log("Error while deleting 1 product : ", error);
        res.status(500).json({ message: "Failed to delete product ", error: error.message});
    }
}

const updateProduct = async(req, res) => {
    try{
        const { name, price } = req.body;
        const product = await ProductModel.findByIdAndUpdate(req.params.id,{name, price}, {new: true, runValidators: true});
        if(!product){
            return res.status(404).json({ error: "Product not found"});
        }
        console.log("Update Product api hit");
        res.status(200).json({ alert: "Product Updated", product});
    } catch(error) {
        console.error("Error while updating : ", error);
        res.status(500).json({ message: "Failed to update product ", error: error.message });
    }
}

const productControllers = {
    addproduct,
    listProduct,
    deleteProduct,
    updateProduct
};

module.exports = productControllers;