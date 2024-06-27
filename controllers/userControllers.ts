import { Op } from 'sequelize'
import { Request, Response, NextFunction } from 'express'

import { User, Profile, Address, Role, Country } from '../models/index'

// Get user data
async function users_get(req: any, res: Response) {
  try {
    const user = req.user
    if (user) {
      const userObj = await User.findOne({
        where: { id: user.id },
        include: [
          { model: Profile },
          {
            model: Address,
            where: {
              line_one: {
                [Op.ne]: null
              }
            }
          },
          {
            model: Role
          }
        ]
      })
      const { firstName, lastName, emailID, mobileNumber, profile, addresses, roles } = userObj
      return res.status(200).json({
        firstName: firstName,
        lastName: lastName,
        emailID: emailID,
        mobileNumber: mobileNumber,
        profile: profile,
        addresses: addresses,
        roles: roles
      })
    } else {
      return res.status(403).json({ error: 'User not valid!' })
    }
  } catch (err) {
    return res.status(403).json({ error: err })
  }
}

// Update user data
async function users_put(req: any, res: Response) {
  try {
    const user = req.user
    if (user) {
      const userObj = await User.findOne({ where: { id: user.id } })
      userObj.firstName = 'firstName' in req.body ? req.body['firstName'] : userObj.firstName
      userObj.lastName = 'lastName' in req.body ? req.body['lastName'] : userObj.lastName
      userObj.emailID = 'emailID' in req.body ? req.body['emailID'] : userObj.emailID
      userObj.mobileNumber = 'mobileNumber' in req.body ? req.body['mobileNumber'] : userObj.mobileNumber
      userObj.save()
      return res.status(200).send(`User updated successfully!`)
    } else {
      return res.status(403).json({ error: 'User not valid!' })
    }
  } catch (err) {
    return res.status(403).json({ error: err })
  }
}

// Create post data
async function address_post(req: any, res: Response) {
  try {
    const user = req.user
    const reqBody = req.body
    if (user) {
      // way1
      /*const userObj = await User.findOne({ where: { id: user.id } })
      await Address.create({
        line_one: 'line_one' in reqBody ? reqBody.line_one : null,
        line_two: 'line_two' in reqBody ? reqBody.line_two : null,
        line_three: 'line_three' in reqBody ? reqBody.line_three : null,
        city: 'city' in reqBody ? reqBody.city : null,
        state: 'state' in reqBody ? reqBody.state : null,
        postal_code: 'postal_code' in reqBody ? reqBody.postal_code : null,
        userId: userObj.id
      })*/
      // way2
      const addressInsert = await Address.create({
        line_one: 'line_one' in reqBody ? reqBody.line_one : null,
        line_two: 'line_two' in reqBody ? reqBody.line_two : null,
        line_three: 'line_three' in reqBody ? reqBody.line_three : null,
        city: 'city' in reqBody ? reqBody.city : null,
        state: 'state' in reqBody ? reqBody.state : null,
        postal_code: 'postal_code' in reqBody ? reqBody.postal_code : null
      })
      const userObj = await User.findOne({ where: { id: user.id } })
      await userObj.addAddress(addressInsert)

      return res.status(200).send(`Address created successfully!`)
    } else {
      return res.status(403).json({ error: 'User not valid!' })
    }
  } catch (err) {
    return res.status(403).json({ error: err })
  }
}

// Update address data
async function address_put(req: any, res: Response) {
  try {
    const reqBody = req.body
    const addressObj: any = await Address.findOne({ where: { id: reqBody.id } })

    /// Way 1
    /*addressObj.line_one = 'line_one' in reqBody ? reqBody.line_one : addressObj.line_one
    addressObj.line_two = 'line_two' in reqBody ? reqBody.line_two : addressObj.line_two
    addressObj.line_three = 'line_three' in reqBody ? reqBody.line_three : addressObj.line_three
    addressObj.city = 'city' in reqBody ? reqBody.city : addressObj.city
    addressObj.state = 'state' in reqBody ? reqBody.state : addressObj.state
    addressObj.postal_code = 'postal_code' in reqBody ? reqBody.postal_code : addressObj.postal_code
    if('country_name' in reqBody){
      const contryObj:any = await Country.findOne({ where: { country_name: reqBody.country_name } })
      addressObj.countryId= contryObj.id
    }
    await  addressObj.save()*/

    /// Way 2
    /*let countryId;
    if ('country_name' in reqBody) {
      const contryObj: any = await Country.findOne({ where: { country_name: reqBody.country_name } })
      countryId = contryObj.id
    }
    await addressObj.update({
      line_one: 'line_one' in reqBody ? reqBody.line_one : addressObj.line_one,
      line_two: 'line_two' in reqBody ? reqBody.line_two : addressObj.line_two,
      line_three: 'line_three' in reqBody ? reqBody.line_three : addressObj.line_three,
      city: 'city' in reqBody ? reqBody.city : addressObj.city,
      state: 'state' in reqBody ? reqBody.state : addressObj.state,
      postal_code: 'postal_code' in reqBody ? reqBody.postal_code : addressObj.postal_code,
      countryId: countryId : addressObj.countryId
    })*/

    /// Way 3
    await addressObj.update({
      line_one: 'line_one' in reqBody ? reqBody.line_one : addressObj.line_one,
      line_two: 'line_two' in reqBody ? reqBody.line_two : addressObj.line_two,
      line_three: 'line_three' in reqBody ? reqBody.line_three : addressObj.line_three,
      city: 'city' in reqBody ? reqBody.city : addressObj.city,
      state: 'state' in reqBody ? reqBody.state : addressObj.state,
      postal_code: 'postal_code' in reqBody ? reqBody.postal_code : addressObj.postal_code
    })
    if ('country_name' in reqBody) {
      const contryObj: any = await Country.findOne({ where: { country_name: reqBody.country_name } })
      addressObj.setCountry(contryObj)
    }

    return res.status(200).send(`Address successfully successfully!`)
  } catch (err) {
    console.log(err)
    return res.status(403).json({ error: err })
  }
}

// Create profile data
async function profile_post(req: any, res: Response) {
  try {
    const user = req.user
    const reqBody = req.body
    if (user) {
      // Way 1
      /*const profileInsert: any = await Profile.create({
        age: 'age' in reqBody ? reqBody.age : null,
        profileName: 'profileName' in reqBody ? reqBody['profileName'] : null,
        profileDescription: 'profileDescription' in reqBody ? reqBody['profileDescription'] : null,
        profilePic: 'profilePic' in reqBody ? reqBody['profilePic'] : null
      })
      const userObj = await User.findOne({ where: { id: user.id } })
      userObj.profileId = profileInsert.id
      userObj.save()*/
      // Way 2
      const profileInsert: any = await Profile.create({
        age: 'age' in reqBody ? reqBody.age : null,
        profileName: 'profileName' in reqBody ? reqBody['profileName'] : null,
        profileDescription: 'profileDescription' in reqBody ? reqBody['profileDescription'] : null,
        profilePic: 'profilePic' in reqBody ? reqBody['profilePic'] : null
      })
      const userObj = await User.findOne({ where: { id: user.id } })
      if (!userObj.profileId) {
        await userObj.setProfile(profileInsert)
        return res.status(200).send(`Profie created successfully!`)
      }
      return res.status(400).send(`Profie already exist!`)
    } else {
      return res.status(403).json({ error: 'User not valid!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(403).json({ error: err })
  }
}

// Update post data
// Generate refresh token and send back to user
async function profile_put(req: any, res: Response) {
  return res.status(403).json({ error: 'N0t implemented yet!' })
}

// // Create post role
// // Create post role
async function role_post(req: any, res: Response) {
  try {
    const user = req.user
    const reqBody = req.body
    if (user) {
      const users = await User.findOne({ where: { id: user.id } })
      const role = await Role.findOne({ where: { role_name: 'role' in reqBody ? reqBody.role : '' } })
      await users.addRole(role)
      return res.status(200).send(`Role created successfully!`)
    } else {
      return res.status(403).json({ error: 'User not valid!' })
    }
  } catch (err) {
    return res.status(403).json({ error: err })
  }
}

export default { users_get, users_put, address_post, address_put, profile_post, profile_put, role_post }
