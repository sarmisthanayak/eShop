const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    zipCode: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      Street: {
        type: String,
        required: true,
      },
      Landmark: {
        type: String,
        required: false,
      },
      City: {
        type: String,
        required: true,
      },
      PhoneNo: {
        type: String,
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
 module.exports = mongoose.model("address",addressSchema);

