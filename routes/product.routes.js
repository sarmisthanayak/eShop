const productController = require('../controller/product.controller');

module.exports = function(app){
    app.get('/api/eShopify/productSearch',productController.searchProducts);
}