const orderController = require('../controller/createOrder.controller');

module.exports = function(app){
    app.post('/api/eShopify/order',orderController.createOrder);
}