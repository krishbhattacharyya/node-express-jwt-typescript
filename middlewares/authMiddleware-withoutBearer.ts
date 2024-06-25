import { Request, Response, NextFunction } from 'express'
import { User } from '../models/index'
import jwt from 'jsonwebtoken'

interface TRequest extends Request {
  user?: string | null
}

const checkCurrentUser = (req: TRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_CODE || 'My JWT Secret', async function (err: any, decoded: any) {
      if (err) {
        req.user = null
        next()
      } else {
        const user = await User.findOne({ where: { id: decoded.id } })
        req.user = user
        next()
      }
    })
  } else {
    req.user = null
    next()
  }
}

export { checkCurrentUser }
