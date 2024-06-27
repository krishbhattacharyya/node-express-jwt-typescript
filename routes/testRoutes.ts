import { Router, Request, Response } from 'express'

const router = Router()
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
