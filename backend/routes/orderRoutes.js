const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder, // ✅ Correct import
  deleteOrder
} = require('../controllers/orderController');

const protect = require('../middlewares/authMiddleware');

router.post('/', createOrder);
router.get('/', protect, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrder); // ✅ Fixed line
router.delete('/:id', protect, deleteOrder);

module.exports = router;
