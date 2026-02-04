import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// This route is PROTECTED (you must be logged in to order)
router.route('/').post(protect, addOrderItems)

export default router