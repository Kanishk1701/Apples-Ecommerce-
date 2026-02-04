import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    // NOTE: In a real production app, you would recalculate prices here 
    // to verify the frontend didn't tamper with them. 
    // For this project, we will trust the frontend data.
    
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id, // Map the generic _id to "product" reference
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

export { addOrderItems }