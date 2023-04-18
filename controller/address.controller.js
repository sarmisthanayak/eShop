const Address = require('../model/address.model');
const jwt = require('jsonwebtoken');
const secretConfig = require('../config/auth.config');

const addAddress = async (req, res) => {
  const { name,PhoneNo,Street,Landmark,City,State,zipCode } = req.body;

  // Check if access token exists
  const accessToken = req.headers['x-auth-token'];
  if (!accessToken) {
    return res.status(401).json({ message: 'Please login first to access this endpoint!' });
  }

  // Validate zip code
  const zipCodeRegex = /^\d{6}$/;
  if (!zipCode.match(zipCodeRegex)) {
    return res.status(400).json({ message: 'Invalid zip code!' });
  }

  // Validate phone number
  const phoneNoRegex = /^\d{10}$/;
  if (!PhoneNo.match(phoneNoRegex)) {
    return res.status(400).json({ message: 'Invalid contact number!' });
  }

  // Get user id from access token
  const decodedToken = jwt.verify(accessToken, secretConfig.secret);
  const userId = decodedToken._id;

  // Add address to database
  const address = new Address({
    userId,
    name,
    PhoneNo,
    Street,
    Landmark,
    City,
    State,
    zipCode,
    });

  try {
    const savedAddress = await address.save();
    res.status(200).json(savedAddress);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add address!' });
  }
};

module.exports = { addAddress };