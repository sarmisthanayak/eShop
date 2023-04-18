const Order = require('../model/createOrder.model');
const Product = require('../model/product.model');
const Address = require('../model/address.model');
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const secretConfig = require('../config/auth.config');


const createOrder = async (req, res) => {
  const { addressId, productId } = req.body;
  const quantity = req.body.quantity || 1;
  const accessToken = req.headers['x-auth-token'];
  const currentDate = new Date();

  // Check if the user is logged in
  if (!accessToken) {
    return res.status(401).json({ message: 'Please login first to access this endpoint!' });
  }

  // Check if the user is an admin
  const decodedToken = jwt.verify(accessToken, secretConfig.secret);
  const userRole = decodedToken.userRole;
  const userId = decodedToken._id;
  if (userRole !== 'USER') {
    return res.status(403).json({ message: 'You are not authorised to access this endpoint!' });
  }
  const user = await User.findById(userId);
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: `No Product found for ID - ${productId}!` });
    }

    // Check if the product is available
   if (product.availableItems < quantity) {
      return res.status(400).json({ message: `Product with ID - ${productId} is currently out of stock!` });
    }

    // Check if the address exists
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: `No Address found for ID - ${addressId}!` });
    }

    // Create the order
    const order = new Order({
        address: address._id,
        product: product._id,
        quantity: quantity,
        user: decodedToken.userId
    });

    await order.save();

    // Update product availableItems
    product.availableItems -= quantity;
    await product.save();

    // Return order object with user, product, and shipping address details
    res.status(201).json({
      id: order._id,
      user: {
        id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        created: user.createdAt,
        updated: user.updatedAt,
      },
      product: {
        productId: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        manufacturer: product.manufacturer,
        availableItems: product.availableItems,
        imageUrl: product.imageURL,
        created: product.createdAt,
        updated: product.updatedAt,
      },
      shippingAddress: {
        id: address._id,
        name: address.name,
        phone: address.PhoneNo,
        street: address.Street,
        landmark: address.Landmark,
        city: address.City,
        state: address.State,
        zipcode: address.zipCode,
        user: {
          id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          created: user.createdAt,
          updated: user.updatedAt,
        },
      },
      amount: product.price,
      orderdate: currentDate,

      
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = {createOrder}
