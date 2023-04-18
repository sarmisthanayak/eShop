const idController = require('../controller/byId.controller');

module.exports = function(app){
    app.post('/api/eShopify/products/:id',idController.getID);
}