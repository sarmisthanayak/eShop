const categoryController = require('../controller/categories.controller');

module.exports = function(app){
    app.get('/api/eShopify/product/category',categoryController.getCategory);
}