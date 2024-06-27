import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'
import bcrypt from 'bcrypt'

const User = sequelizeConnection.define(
  'users',
  {
    firstName: {
      type: DataType.STRING
    },
    lastName: {
      type: DataType.STRING
    },
    emailID: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    mobileNumber: {
      type: DataType.STRING,
      unique: true
    },
    lastLogin: {
      type: DataType.DATE
    },
    acitvated_user: {
      type: DataType.BOOLEAN
    },
    acitvate_code: {
      type: DataType.STRING
    },
    password: {
      type: DataType.STRING
    }
  },
  {
    freezeTableName: true,
    hooks: {
      async beforeCreate(user: any, options) {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  }
)

export default User
