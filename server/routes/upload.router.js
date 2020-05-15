const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

const User = require('../models/user.model');

app.use(fileUpload({ useTempFiles: true }));

app.put('/:type/:id', (req, res) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'File not selected'
            }
        });
    }

    let type = req.params.type;
    let id = req.params.id;

    const validTypes = ['product', 'user'];
    if (!validTypes.includes(type)) {
        return res.status(500).json({
            ok: false,
            err: {
                message: `Only ${validTypes.join(', ')} types are accepted`
            }
        });
    }

    let file = req.files.file;

    const validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    if (!validExtensions.includes(file.mimetype)) {
        return res.status(500).json({
            ok: false,
            err: {
                message: `Only ${validExtensions.join(', ')} extensions are accepted`
            }
        });
    }

    let fileName = `${ id }-${ new Date().getTime() }.${ file.mimetype.split('/').pop() }`;

    file.mv(`uploads/${ type }/${ fileName }`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Image uploaded succesfully'
        });
    });

});

function imgUser() {
    
}

function imgProduct() {

}

module.exports = app;
