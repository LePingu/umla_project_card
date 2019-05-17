const login = require('../authentication/login.js');
const signup = require('../authentication/signup.js');

module.exports = function (app) {
    app.post('/login',login.login);
    app.post('/signup',signup.signup);
    
}