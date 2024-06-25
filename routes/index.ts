import { Router } from 'express'
import authRoutes from './authRoutes'
import productRoutes from './productRoutes'
import { checkCurrentUser } from '../middlewares/authMiddleware'

const router = Router()

router.get('*', checkCurrentUser)
router.use('/auth', authRoutes)
router.use('/product', productRoutes)

export default router
