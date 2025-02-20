const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// Create a new order (User)
router.post('/', authMiddleware, createOrder);

// Get all orders (Admin)
router.get('/', authMiddleware, updateAdminAccess, getAllOrders);

// Get order by ID (User or Admin)
router.get('/:id', authMiddleware, getOrderById);

// Update order status (Admin)
router.put('/:id/status', authMiddleware, updateAdminAccess, updateOrderStatus);

module.exports = router;

// Middleware to allow only admin to access certain routes
function updateAdminAccess(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
}
