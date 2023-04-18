const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    availableItems: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      imageURL: {
        type: String,
        required: true,
      },
      manufacturer: {
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
 module.exports = mongoose.model("product",productSchema);

