const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        required: true,
      },
      createdAt: {
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        }
      },
      updatedAt: {
        type: Date, 
        default: ()=>{
            return Date.now();
        }
      },

    });
 module.exports = mongoose.model("user",userSchema);