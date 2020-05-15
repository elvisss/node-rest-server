const express = require('express');

const app = express();

app.use( require('./user.router') );
app.use( require('./login.router') );
app.use('/category', require('./category.router') );
app.use('/product', require('./product.router') );

module.exports = app;
