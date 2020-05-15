const express = require("express");
const _ = require("underscore");

const Product = require("../models/product.model");
const { verifyToken } = require("../middlewares/auth");

const app = express();

app.get("/", (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);
    const term = req.query.term || '';
    let regex = new RegExp(term, 'i');

    Product.find({
            available: true,
            name: regex
        })
        .skip(from)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                products
            });
        });

});

app.get("/:id", (req, res) => {

    const id = req.params.id;

    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!productDB || !productDB.available) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Product Not Found'
                    }
                });
            }
            res.json({
                ok: true,
                product: productDB
            });
        })
});

app.post('/', verifyToken, (req, res) => {
    let body = req.body;
    let user = req.user;

    let product = new Product({
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        category: body.category,
        user: user._id
    });

    product.save((err, productDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });

    });

});

app.put('/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'unitPrice', 'description', 'category']);
    // body.user = req.user._id;

    Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Product not found'
                }
            });
        }

        res.json({
            ok: true,
            product: productDB
        });

    });

});

app.delete('/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Product.findByIdAndUpdate(id, { available: false }, (err, productDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productDeleted) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Product not found'
                }
            });
        }

        res.json({
            ok: true,
            product: "Product deleted"
        });
    });

});

module.exports = app;
