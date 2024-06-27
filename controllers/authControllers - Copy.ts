import { Request, Response, NextFunction } from 'express'

import { User, Profile, Address } from '../models/index'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

interface TRequest extends Request {
  user?: string | null
}

const maxAccessTime = '120s' // second for the access token

const maxRefreshTime = '1200000s' // second for the access token

function generateAccessToken(id: any) {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE_ACCESS_TOKEN || '12', { expiresIn: maxAccessTime })
}

function generateRefreshToken(id: any) {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE_REFRESH_TOKEN || '123', { expiresIn: maxRefreshTime })
}

// signup POST create a new user in DB
async function signup_post(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const user: any = await User.create({ emailID: email, password: password, role: 2 })
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
    //return res.status(200).send('Successfully logout')
  } else {
    return res.status(200).send('User already logout')
  }
}

async function insertAddress(address: any, userObj: any) {
  try {
    const addressInsert: any = await Address.create({
      line_one: 'line_one' in address ? address.line_one : null,
      line_two: 'line_two' in address ? address.line_two : null,
      line_three: 'line_three' in address ? address.line_three : null,
      city: 'city' in address ? address.city : null,
      state: 'state' in address ? address.state : null,
      postal_code: 'postal_code' in address ? address.postal_code : null,
      userId: userObj.id
    })
    console.log(addressInsert.id)
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}

async function insertProfile(profile: any, userObj: any) {
  try {
    const addressInsert: any = await Profile.create({
      age: 'age' in profile ? profile.age : null,
      profileName: 'profileName' in profile ? profile.profileName : null,
      profileDescription: 'profileDescription' in profile ? profile.profileDescription : null,
      profilePic: 'profilePic' in profile ? profile.profilePic : null,
      userId: userObj.id
    })
  } catch (err: any) {
    throw new Error(err)
  }
}

// Generate refresh token and send back to user
async function user_put(req: any, res: Response) {
  try {
    const user = req.user
    const address = 'address' in req.body ? req.body.address : null
    const profile = 'profile' in req.body ? req.body.profile : null
    if (user) {
      const userObj = await User.findOne({ where: { id: user.id } })
      if (address && profile && userObj) {
        await insertAddress(address, userObj)
        await insertProfile(profile, userObj)
        console.log('aaaaaaaaaaaaaaaaaa')
        return res.status(200).json({ message: 'Successfully address and profile updated' })
      } else if (address && userObj) {
        console.log('bbbbbbbbb')
        await insertAddress(address, userObj)
        return res.status(200).json({ message: 'Successfully address updated' })
      } else if (profile && userObj) {
        console.log('ccccccccccc')
        await insertProfile(profile, userObj)
        return res.status(200).json({ message: 'Successfully profile updated' })
      } else {
        return res.status(400).send('Please connect to use')
      }
    } else {
      return res.status(403).json({ error: 'User not valid!' })
    }
  } catch (err) {
    console.log('err=========================111')
    return res.status(403).json({ error: err })
  }
}

// Generate refresh token and send back to user
async function refreshtoken_post(req: any, res: Response) {
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

export default { signup_post, login_post, logout_get, refreshtoken_post, user_put }
