const Product = require('../model/product.model');
const jwt = require('jsonwebtoken');
const secretConfig = require('../config/auth.config');

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const accessToken = req.headers['x-auth-token'];

  // Check if the user is logged in
  if (!accessToken) {
    return res.status(401).json({ message: 'Please login first to access this endpoint!' });
  }

  // Check if the user is an admin
  const decodedToken = jwt.verify(accessToken, secretConfig.secret);
  if (decodedToken.userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'You are not authorised to access this endpoint!' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: `No Product found for ID - ${productId}!` });
    }
    return res.status(200).json({ message: `Product with ID - ${productId} deleted successfully!` });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { deleteProduct };