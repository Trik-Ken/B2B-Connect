const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error in products route:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});

module.exports = router; 