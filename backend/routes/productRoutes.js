import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct) // <--- Create Route

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct) // <--- Delete Route

router.route('/:id')
  .put(protect, admin, updateProduct)

export default router