const Product = require('../model/product.model');
const jwt = require('jsonwebtoken');
const secretConfig = require('../config/auth.config');

const createProduct = async (req, res) => {
  const { name, availableItems, price, category, description, imageURL, manufacturer } = req.body;
  const accessToken = req.headers['x-auth-token'];

  // Check if the user is logged in
  if (!accessToken) {
    return res.status(401).json({ message: 'Please login first to access this endpoint!' });
  }

  // Check if the user is an admin
  const decodedToken = jwt.verify(accessToken, secretConfig.secret);
  //const userRole = decodedToken.role;
  console.log(decodedToken.userRole);
  if (decodedToken.userRole!=="ADMIN") {
    return res.status(403).json({ message: 'You are not authorised to access this endpoint!' });
  }
  

  const newProduct = new Product({
    name,
    availableItems,
    price,
    category,
    description,
    imageURL,
    manufacturer,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports =  {createProduct};