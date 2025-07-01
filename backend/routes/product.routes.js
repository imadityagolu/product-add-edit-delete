const express = require("express");
const router = express.Router();

const {
    addproduct,
    listProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/product.controllers');

router.post("/add", addproduct);
router.get("/list", listProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

module.exports = router;