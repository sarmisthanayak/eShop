const updateidController = require('../controller/updateId.controller');

module.exports = function(app){
    app.put('/api/eShopify/updateproduct/:id',updateidController.updateProduct);
}