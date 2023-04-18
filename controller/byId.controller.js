const Product = require('../model/product.model');

exports.getID = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

  // Return error response if product not found
  if (!product) {
    return res.status(404).json({ message: `No Product found for ID - ${productId}!` });
  }

  // Return product details in JSON format
  res.status(200).json(product);
}

