require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// const { json } = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// public folder
app.use(express.static( path.resolve( __dirname, '../public' ) ));

// Routes
app.use( require('./routes/index') );

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}, (err, res) => {
    if ( err ) throw err;
    console.log('DB connected')
});

app.listen(process.env.PORT, (err, res) => {
    console.log('Listenning on port: ', process.env.PORT);
});
