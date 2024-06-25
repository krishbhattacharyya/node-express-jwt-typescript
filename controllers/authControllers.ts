import { Request, Response, NextFunction } from 'express'

import { User } from '../models/index'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

interface TRequest extends Request {
  user?: string | null
}

const maxJwtTime = '40s' // second for the access token

function generateAccessToken(id: any) {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE_ACCESS_TOKEN || '12', { expiresIn: maxJwtTime })
}

function generateRefreshToken(id: any) {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE_REFRESH_TOKEN || '123')
}

// signup POST create a new user in DB
async function signup_post(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const user: any = await User.create({ emailID: email, password: password })
    return res.status(201).send(`Thank you for registration: ${email}`)
  } catch (err: any) {
    return res
      .status(400)
      .json(err && err.errors[0] && err.errors[0].message ? err.errors[0].message : 'Probem to user creation!')
  }
}

// login POST authenticate current user
async function login_post(req: TRequest, res: Response) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { emailID: email } })
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        const accessToken = generateAccessToken(user.id)

        const refreshToken = generateRefreshToken(user.id)
        return res.status(200).json(
          user.firstName
            ? {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: { firstname: user.firstName, userId: user.id }
              }
            : { accessToken: accessToken, refreshToken: refreshToken, user: { email: user.emailID, userId: user.id } }
        )
      } else {
        return res.status(400).json({ error: 'Incorrect password' })
      }
    } else {
      return res.status(400).json({ error: 'Incorrect user' })
    }
  } catch (err: any) {
    return res.status(400).json(err)
  }
}

// logout log a user out
async function logout_get(req: any, res: Response) {
  if (req.user) {
    return res.status(200).send('Successfully logout')
  } else {
    return res.status(200).send('User already logout')
  }
}

// Generate refresh token and send back to user
async function refresh_token(req: any, res: Response) {
  const token = req.body.token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_CODE_REFRESH_TOKEN || '123', async function (err: any, decoded: any) {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' })
      } else {
        const user = await User.findOne({ where: { id: decoded.id } })
        const accessToken = generateAccessToken(user.id)
        return res.status(200).json({ accessToken: accessToken })
      }
    })
  } else {
    return res.status(403).json({ error: 'Forbidden' })
  }
}

export default { signup_post, login_post, logout_get, refresh_token }
