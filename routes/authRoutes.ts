import { Router, Request, Response } from 'express'

// Contrlers keep our logic seperate than actual routes
import authController from '../controllers/authControllers'

const router = Router()

router.post('/signup', (req: Request, res: Response) => authController.signup_post(req, res))

router.post('/login', (req: Request, res: Response) => authController.login_post(req, res))

router.post('/refreshtoken', (req: Request, res: Response) => authController.refresh_token(req, res))

router.get('/logout', (req: Request, res: Response) => authController.logout_get(req, res))

// Bellow code just for experiment
router.get('/setcookies', (req: Request, res: Response) => {
  // Just development purpose
  res.status(201)
  res.cookie('name', 'krish')
  res.cookie('token', false, {
    httpOnly: true, // We can not access the cookie from javascript can not access from frontend
    secure: true, // Only available in HTTPS
    //sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
    //maxAge: 1000 * 5
  })
  res.send('You got the cookie!')
})

router.get('/readcookies', (req: Request, res: Response) => {
  // We can access the token cookie via req object not from the browser
  res.status(201)
  const cookies = req.cookies
  console.log(cookies)
  res.send(cookies)
})

export default router
