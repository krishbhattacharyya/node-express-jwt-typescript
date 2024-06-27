import { Router, Request, Response } from 'express'

// Contrlers keep our logic seperate than actual routes
import userController from '../controllers/userControllers'

const router = Router()

router.get('/', (req: Request, res: Response) => userController.users_get(req, res))
router.put('/', (req: Request, res: Response) => userController.users_put(req, res))
router.post('/address', (req: Request, res: Response) => userController.address_post(req, res))
router.put('/address', (req: Request, res: Response) => userController.address_put(req, res))
router.post('/profile', (req: Request, res: Response) => userController.profile_post(req, res))
router.put('/profile', (req: Request, res: Response) => userController.profile_put(req, res))
router.post('/role', (req: Request, res: Response) => userController.role_post(req, res))

export default router
