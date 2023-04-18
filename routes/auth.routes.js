const authController = require('../controller/auth.controller');

module.exports = function(app){
    app.post('/api/eShopify/signup',authController.signup);
}