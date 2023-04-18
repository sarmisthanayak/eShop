const user = require('../model/user.model');

const bcrypt = require('bcrypt');

exports.signup = async (req,res)=>{
    const { firstName, lastName, email, password, contactNumber,role } = req.body;

    const userExists = await user.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Try any other email, this email is already registered!' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email-id format!' });
  }

  const contactRegex = /^[0-9]{10}$/;
  if (!contactRegex.test(contactNumber)) {
    return res.status(400).json({ message: 'Invalid contact number!' });
  }

  const hashedPassword = await bcrypt.hash(password, 8);
    const userObj={
        password: hashedPassword,
        firstName,
        lastName,
        email,
        contactNumber,
        role
    }
    try{
        const usero = await user.create(userObj)
        res.status(200).send(usero);
    } catch(err){
        console.log("Error while creating user" +err.message);
        res.status(500).send({
            message:"Internal server error"
        });
    }

}