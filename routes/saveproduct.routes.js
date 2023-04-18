const saveproductController = require('../controller/saveproduct.controller');

module.exports = function(app){
    app.post('/api/eShopify/products',saveproductController.createProduct);
}