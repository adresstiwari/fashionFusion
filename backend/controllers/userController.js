const User = require('../models/User');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        addresses: user.addresses,
        role: user.role
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add address
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.addresses.push(req.body);
      await user.save();
      
      res.json(user.addresses);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      const addressIndex = user.addresses.findIndex(
        addr => addr._id.toString() === req.params.id
      );
      
      if (addressIndex !== -1) {
        user.addresses[addressIndex] = {
          ...user.addresses[addressIndex].toObject(),
          ...req.body
        };
        
        await user.save();
        res.json(user.addresses);
      } else {
        res.status(404);
        throw new Error('Address not found');
      }
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.addresses = user.addresses.filter(
        addr => addr._id.toString() !== req.params.id
      );
      
      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      if (!user.wishlist.includes(req.params.productId)) {
        user.wishlist.push(req.params.productId);
        await user.save();
      }
      
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.wishlist = user.wishlist.filter(
        productId => productId.toString() !== req.params.productId
      );
      
      await user.save();
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    
    if (user) {
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};