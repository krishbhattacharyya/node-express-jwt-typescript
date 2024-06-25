import bcrypt from 'bcrypt'

const saltRounds = 10 // Typically a value between 10 and 12

async function getHashPassword(password: any) {
  return bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      //console.log('Salt: ', salt)
      return bcrypt.hash(password, salt)
    })
    .then((hash) => {
      //console.log('Hash: ', hash)
      return hash
    })
    .catch((err) => console.error(err.message))
}

export { getHashPassword }
