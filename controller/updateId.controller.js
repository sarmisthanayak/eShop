const Product = require('../model/product.model');
const jwt = require('jsonwebtoken');
const secretConfig = require('../config/auth.config');

const updateProduct = async (req, res) => {
  const { name, availableItems, price, category, description, imageUrl, manufacturer } = req.body;
  const {id} = req.params;
  const accesstoken = req.headers['x-auth-token'];

  // Check if the user is logged in
  if (!accesstoken) {
    return res.status(401).json({ message: 'Please login first to access this endpoint!' });
  }

  // Check if the user is an admin
  const decodedToken = jwt.verify(accesstoken, secretConfig.secret);
  console.log(decodedToken.userRole);
  if (decodedToken.userRole!=="ADMIN") {
    return res.status(403).json({ message: 'You are not authorised to access this endpoint!' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
        id, {
        name,
        availableItems,
        price,
        category,
        description,
        imageUrl,
        manufacturer,
        },
      
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({
      productId: updatedProduct.id,
      name: updatedProduct.name,
      availableItems: updatedProduct.availableItems,
      price: updatedProduct.price,
      category: updatedProduct.category,
      description: updatedProduct.description,
      imageUrl: updatedProduct.imageUrl,
      manufacturer: updatedProduct.manufacturer,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { updateProduct };