import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

// Protect routes (Verify the user is logged in)
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Read the JWT from the "jwt" cookie
  token = req.cookies.jwt

  if (token) {
    try {
      // Decode the token to get the User ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Find the user in the DB (exclude the password)
      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// Admin middleware (Verify the user is an Admin)
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

export { protect, admin }