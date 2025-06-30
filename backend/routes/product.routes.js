const express = require("express");
const router = express.Router();

const {
    addproduct,
    listProduct
} = require('../controllers/product.controllers');

router.post("/add", addproduct);
router.get("/list", listProduct);

module.exports = router;