import { Request, Response, NextFunction } from 'express'

import { User } from '../models/index'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

interface TRequest extends Request {
  user?: string | null
}

const maxJwtTime = 30 * 5 * 1000 // second for the access token

function createToken(id: any) {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE || 'My JWT Secret', { expiresIn: maxJwtTime })
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
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: false, secure: true, maxAge: maxJwtTime }) // httpOnly:true, in production User cant change the token using js
        return res
          .status(200)
          .json(
            user.firstName ? { firstname: user.firstName, userId: user.id } : { email: user.emailID, userId: user.id }
          )
      } else {
        return res.status(400).json('Incorrect password')
      }
    } else {
      return res.status(400).json('Incorrect user')
    }
  } catch (err: any) {
    //throw new Error(err)
    return res.status(400).json(err)
  }
}

// logout log a user out
async function logout_get(req: any, res: Response) {
  if (req.user) {
    res.cookie('jwt', '', { httpOnly: false, secure: true, maxAge: 1 }) // httpOnly:true, in production User cant change the token using js
    return res.status(200).send('Successfully logout')
  } else {
    return res.status(200).send('User already logout')
  }
}

export default { signup_post, login_post, logout_get }
