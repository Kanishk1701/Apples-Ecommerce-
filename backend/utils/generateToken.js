import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  // 1. Create the Token (The "Badge")
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Badge is valid for 30 days
  })

  // 2. Save it in a Secure Cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents JavaScript attacks (XSS)
    secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days in milliseconds
  })
}

export default generateToken