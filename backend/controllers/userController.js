import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'

// @desc    Auth user & get token (LOGIN)
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    // Check if they are verified (Optional: Enforce verification here if you want)
    if (!user.isVerified) {
       // You can choose to block them or let them in. 
       // For now, let's just log them in but you could throw an error.
    }

    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register user & Send OTP
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // 1. Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpExpires = Date.now() + 10 * 60 * 1000 // Expires in 10 mins

  // 2. Create User (Verified = false)
  const user = await User.create({
    name,
    email,
    password,
    otp,
    otpExpires,
    isVerified: false,
  })

  if (user) {
    // 3. Send Email
    const message = `
      <div style="font-family: serif; color: #111; padding: 20px;">
        <h1 style="text-transform: uppercase; letter-spacing: 2px;">Verify Your Identity</h1>
        <p>Welcome to Apples. To complete your registration, please use the following code:</p>
        <h2 style="background: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 5px;">${otp}</h2>
        <p>This code expires in 10 minutes.</p>
      </div>
    `

    try {
      await sendEmail({
        email: user.email,
        subject: 'Apples ID Verification',
        message,
      })

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: 'OTP sent to email',
      })
    } catch (error) {
      await User.findByIdAndDelete(user._id)
      res.status(500)
      throw new Error('Email could not be sent. Please try again.')
    }
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Verify OTP & Login
// @route   POST /api/users/verify
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const { email, otp } = req.body

  const user = await User.findOne({ email })

  if (user && user.otp === otp && user.otpExpires > Date.now()) {
    // Success: Clear OTP and Verify
    user.isVerified = true
    user.otp = undefined
    user.otpExpires = undefined
    await user.save()

    generateToken(res, user._id) // Log them in automatically

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid or Expired OTP')
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out successfully' })
})

export { authUser, registerUser, logoutUser, verifyUser }