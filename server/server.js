require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

// const { json } = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use( require('./routes/index') );

app.get('/', (req, res) => {
    res.json('Hello World');
});

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
