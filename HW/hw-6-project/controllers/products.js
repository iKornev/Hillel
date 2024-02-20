const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send('товар не знайдено!');
  }

  res.send(product);
};

const createProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!product) {
    return res.status(404).send('товар не знайдено!');
  }

  res.send(product);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send('товар видалено!');
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
