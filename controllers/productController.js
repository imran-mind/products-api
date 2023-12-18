const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const product = new Product(body);
        console.log('req.userInfo->> ', req.userInfo);
        const result = await product.save();
        res.status(201)
            .json({ message: "success", data: result });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const projection = { __v: 0, createdAt: 0, updatedAt: 0 };
        const result = await Product.find({}, projection)
        res.status(200)
            .json({ data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const projection = { __v: 0, createdAt: 0, updatedAt: 0 };
        const result = await Product.findById(id, projection);
        res.status(200)
            .json({ data: result });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

const updateProductById = async (req, res) => {
    try {
        console.log('req.user_info', req.user_info);
        const id = req.params.id;
        const body = req.body;
        const updateDoc = { $set: { ...body } };
        await Product.findByIdAndUpdate(id, updateDoc);
        res.status(200)
            .json({ message: "updated" });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(200)
            .json({ message: "deleted" });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}