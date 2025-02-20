const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category'); // Add this line

const router = express.Router();

// Add a new product
router.post('/add', async (req, res) => {
    const { name, price, description, category, stock, image } = req.body;

    try {
         // Check if the category exists
         let categoryDoc = await Category.findOne({ name: category });

         // If the category does not exist, create a new one
         if (!categoryDoc) {
             categoryDoc = new Category({ name: category });
             await categoryDoc.save();
         }


         // Now, create the product with the category
        const newProduct = new Product({ name, 
            price, 
            description, 
            category: categoryDoc.name, // Use the category name
            stock, 
            image });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { name, price, description, category, stock, image } = req.body;

    try {

        // Check if category exists or create a new one
        let categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            categoryDoc = new Category({ name: category });
            await categoryDoc.save();
        }

        // Update product with the correct category

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category, stock, image },
            { new: true }
        );
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
