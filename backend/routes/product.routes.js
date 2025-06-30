const express = require("express");
const router = express.Router();

const {
    addproduct
} = require('../controllers/product.controllers');

router.post("/add", addproduct);

module.exports = router;