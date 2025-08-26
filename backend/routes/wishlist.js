const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('items.product');
    res.json(wishlist?.items || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        items: [{ product: productId }]
      });
    } else {
      const existingItem = wishlist.items.find(item => item.product.toString() === productId);
      
      if (existingItem) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      
      wishlist.items.push({ product: productId });
    }
    
    await wishlist.save();
    await wishlist.populate('items.product');
    
    res.json(wishlist.items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (wishlist) {
      wishlist.items = wishlist.items.filter(item => item.product.toString() !== req.params.productId);
      await wishlist.save();
      await wishlist.populate('items.product');
    }
    
    res.json(wishlist?.items || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;