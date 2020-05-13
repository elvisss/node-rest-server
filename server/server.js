require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

// const { json } = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( require('./routes/user.router') );

app.get('/', (req, res) => {
    res.json('Hello World');
});

mongoose.connect('mongodb://localhost:27017/cafe', {
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
}, () => {
    console.log('Error connection to DB');
});
