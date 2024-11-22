const express = require('express');
const db = require('../db-config');
const router = express.Router();

// Get all products
router.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error fetching products');
    res.json(results);
  });
});

// Add a product (Admin only)
router.post('/admin/add-product', (req, res) => {
  const { name, description, price, image_url, category } = req.body;
  const query = 'INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [name, description, price, image_url, category], (err) => {
    if (err) return res.status(500).send('Error adding product');
    res.send('Product added successfully');
  });
});

module.exports = router;
