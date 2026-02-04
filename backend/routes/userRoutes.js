import express from 'express'
const router = express.Router()
import { authUser, registerUser, logoutUser } from '../controllers/userController.js'

router.post('/', registerUser)
router.post('/logout', logoutUser)
router.post('/login', authUser)

export default router