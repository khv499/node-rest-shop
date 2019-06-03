// Importing express package
const express = require('express');

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// Multer is a node.js middleware for handling multipart/form-data

// Multer adds a body object and a file or files object to the request object. 

// The body object contains the values of the text fields of the form, 
// the file or files object contains the files uploaded via the form.
const multer = require('multer');

// JWT Route Protection
const checkAuth = require('../middleware/check-auth')

// The disk storage engine gives you full control on storing files to disk.

// There are two options available, destination and filename. 
// They are both functions that determine where the file should be stored.

// destination is used to determine within which folder the uploaded files should be stored.
// filename is used to determine what the file should be named inside the folder.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

// Applying filters
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // Accept a file
        cb(null, true)
    } else{
        // Reject a file
        cb(null, false)
    }
}

const upload = multer({ 
    storage : storage, 
    limits: {
    fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

// Product Controller
const ProductsController = require('../controllers/products')

// Handle incoming GET requests to /products
router.get('/', ProductsController.products_get_all);

// Handle incoming POST requests to /products
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

// Handle incoming GET requests to /products/:productId
router.get('/:productId', ProductsController.products_get_product)

// Handle incoming PATCH requests to /products/:productId
router.patch('/:productId', checkAuth, ProductsController.products_patch_product)

// Handle incoming DELETE requests to /products/:productId
router.delete('/:productId', checkAuth, ProductsController.products_delete_product)

module.exports = router;