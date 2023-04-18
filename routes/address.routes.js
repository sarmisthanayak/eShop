const addressController = require('../controller/address.controller');

module.exports = function(app){
    app.post('/api/eShopify/address',addressController.addAddress);
}