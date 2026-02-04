import express from 'express'
const router = express.Router()
import { 
  addOrderItems, 
  getOrderById, 
  updateOrderToPaid, 
  createRazorpayOrder
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/razorpay').post(protect, createRazorpayOrder)
export default router