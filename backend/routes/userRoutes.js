import express from 'express'
const router = express.Router()
// WE ADDED 'verifyUser' TO THIS LIST BELOW:
import { authUser, registerUser, logoutUser, verifyUser } from '../controllers/userController.js'

router.post('/', registerUser)
router.post('/verify', verifyUser) // The route that was failing
router.post('/logout', logoutUser)
router.post('/login', authUser)

export default router