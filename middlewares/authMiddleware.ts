import { Request, Response, NextFunction } from 'express'
import { User } from '../models/index'
import jwt from 'jsonwebtoken'

interface TRequest extends Request {
  user?: string | null
}

const checkCurrentUser = (req: TRequest, res: Response, next: NextFunction) => {
  if (req.url === '/auth/signup' || req.url === '/auth/login' || req.url === '/auth/refreshtoken') return next()
  const authHeader = req.headers['authorization']
  const token = authHeader && (authHeader as string).split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_CODE_ACCESS_TOKEN || '123', async function (err: any, decoded: any) {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' })
      } else {
        const user = await User.findOne({ where: { id: decoded.id } })
        req.user = user
        next()
      }
    })
  } else {
    return res.status(403).json({ error: 'Forbidden' })
  }
}

export { checkCurrentUser }
