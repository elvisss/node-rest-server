const express = require("express");
const _ = require("underscore");

const Category = require("../models/category.model");
const { verifyToken, verifyAdminRole } = require("../middlewares/auth");

const app = express();

app.get("/", (req, res) => {

    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categories
            });
        });

});

app.get("/:id", (req, res) => {

    const id = req.params.id;

    Category.findById( id, (err, categoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if ( !categoryDB ) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Category Not Found'
                }
            });
        }
        res.json({
            ok: true,
            category: categoryDB
        });
    })
});

app.post('/', verifyToken, (req, res) => {
    let body = req.body;
    let user = req.user;

    let category = new Category({
        description: body.description,
        user: user._id
    });

    category.save( (err, categoryDB) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            category: categoryDB
        });

    });

});

app.put('/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick( req.body, ['description'] );
    body.user = req.user._id;

    Category.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, categoryDB ) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Category not found'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

});

app.delete('/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id;

    Category.findByIdAndRemove( id, (err, categoryDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoryDeleted) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Category not found'
                }
            });
        }

        res.json({
            ok: true,
            category: "Category deleted"
        });
    });

});

module.exports = app;
