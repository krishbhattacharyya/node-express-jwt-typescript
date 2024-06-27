import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import productRoutes from './productRoutes'
import { checkCurrentUser } from '../middlewares/authMiddleware'

const router = Router()

//router.get('*', checkCurrentUser)
//router.put('*', checkCurrentUser)
//router.post('*', checkCurrentUser)
router.use(checkCurrentUser)
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/product', productRoutes)

export default router
