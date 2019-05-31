// Importing express package
const express = require('express');

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Importing productSchema
const Product = require('../models/product');
const mongoose = require('mongoose');

// Handle incoming GET requests to /products
router.get('/',(req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            products : docs.map(doc =>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request:{
                        type: 'GET',
                        description: 'Product Information',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// Handle incoming POST requests to /products
router.post('/',(req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    // save() will store data in database
    product.save().then(result => {
        res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    description: 'Get Created Product Information',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
    
});

// Handle incoming GET requests to /products/:productId
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
        console.log("From Database", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request:{
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products'

                }
            });
        }else{
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            })
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error : err})
    })
})

// Handle incoming PATCH requests to /products/:productId
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id : id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product Updated',
            request: {
                type: 'GET',
                description: 'Get Updated Product Information',
                url: 'http://localhost:3000/products/' + id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

// Handle incoming DELETE requests to /products/:productId
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product Deleted',
            request: {
                type: 'POST',
                description: 'Create a new Product',
                url: 'http://localhost:3000/products',
                body: {
                    name: 'String',
                    price: 'Number'
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;