const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, product, quantity, image } = req.body;

    const newOrder = new Order({
      customerName,
      product,
      quantity,
      image,
    });

    const savedOrder = await newOrder.save();

    // ✅ Emit the event using Socket.IO
    const io = req.app.get('io');
    io.emit('newOrder', savedOrder); // Send the new order to all connected clients

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all orders
// ✅ GET all orders with optional filters
exports.getAllOrders = async (req, res) => {
    try {
      const { product, date } = req.query;
  
      const filter = {};
  
      // Filter by product name (case-insensitive)
      if (product) {
        filter.productName = { $regex: product, $options: 'i' };
      }
  
      // Filter by date (only YYYY-MM-DD)
      if (date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        filter.createdAt = { $gte: start, $lte: end };
      }
  
      const orders = await Order.find(filter).sort({ createdAt: -1 });
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Full order update (used for editing)
exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json({ success: true, message: 'Order updated', order: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
