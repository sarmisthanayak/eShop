const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const secretConfig = require('../config/auth.config')

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists with this email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'This email has not been registered!' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Credentials!' });
  }

  // Generate access token
  const token = jwt.sign(
    { _id: user._id, name: `${user.firstName} ${user.lastName}`, isAdmin: user.role === 'ADMIN', userRole: user.role },
    secretConfig.secret,
    { expiresIn: '1h' }
  );
  console.log(token);

  res.set('x-auth-token', token).json({ email: user.email, name: `${user.firstName} ${user.lastName}`, isAuthenticated: true });
};


module.exports = { login };