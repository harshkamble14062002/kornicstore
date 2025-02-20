const Order = require('../models/Order'); // Order model
const Product = require('../models/Product'); // Product model
const User = require('../models/User'); // User model

// Create a new order
exports.createOrder = async (req, res) => {
    const { items, userId, totalAmount, shippingAddress, paymentStatus } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the products exist in the inventory
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Product ${item.productId} is not available or out of stock` });
            }
        }

        // Create the order
        const order = await Order.create({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentStatus,
            orderDate: new Date(),
        });

        // Update product stock after the order is created
        for (const item of items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity },
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all orders (Admin access)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email').populate('items.productId', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single order by ID (Admin or User access)
exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId).populate('userId', 'name email').populate('items.productId', 'name price');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only allow users to see their orders
        if (order.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'You are not authorized to view this order' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update the order status (Admin access)
exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body; // e.g., "Shipped", "Delivered", etc.

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the status of the order
        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
