import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getDetail } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/detail', authMiddleware, getDetail)

export default router