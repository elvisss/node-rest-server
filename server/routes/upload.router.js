const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();

const User = require('../models/user.model');
const Product = require('../models/product.model');

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

        uploadImg(id, res, fileName, type);
    });

});

function uploadImg(id, res, fileName, type) {

    let Model = type === 'user' ? User : Product;
    
    Model.findById(id, (err, modelDB) => {
        if (err) {

            deleteFile(fileName, type);

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!modelDB) {

            deleteFile(fileName, type);

            return res.status(400).json({
                ok: false,
                err: {
                    message: `${type} not found`
                }
            });
        }

        deleteFile(modelDB.img, type);

        modelDB.img = fileName;
        modelDB.save( (err, modelSaved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user: modelSaved
            })
        });
    });

}

function deleteFile(filename, type) {
    let pathImg = path.resolve(__dirname, `../../uploads/${ type }/${ filename }`);

    if ( fs.existsSync( pathImg ) ) {
        fs.unlinkSync(pathImg);
    }
}

module.exports = app;
