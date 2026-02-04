import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'
import Razorpay from 'razorpay'
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const payment_capture = 1
    const amount = order.totalPrice
    const currency = 'INR'

    const options = {
      amount: (amount * 100).toString(), // Razorpay expects amount in paisa (x100)
      currency,
      receipt: order._id.toString(),
      payment_capture,
    }

    try {
      const response = await razorpay.orders.create(options)
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        key: process.env.RAZORPAY_KEY_ID, // Send key to frontend
      })
    } catch (error) {
      console.log(error)
      res.status(400)
      throw new Error('Unable to create Razorpay order')
    }
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    // Data from PayPal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
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
const getOrderById = asyncHandler(async (req, res) => {
  // Find order and also get the name/email of the user who bought it
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
export { addOrderItems, getOrderById, updateOrderToPaid, createRazorpayOrder }