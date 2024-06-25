import { Router, Request, Response } from 'express'

// Contrlers keep our logic seperate than actual routes
import productController from '../controllers/productControllers'

const router = Router()

router.get('/getallproducts', (req: Request, res: Response) => productController.products_get(req, res))

export default router
