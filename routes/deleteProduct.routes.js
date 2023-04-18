const deleteController = require('../controller/deleteProduct.controller');

module.exports = function(app){
    app.delete('/api/eShopify/products/:id',deleteController.deleteProduct);
}