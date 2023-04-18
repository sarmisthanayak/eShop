const loginController = require('../controller/login.controller');

module.exports = function(app){
    app.post('/api/eShopify/auth',loginController.login);
}