import { Sequelize, DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

const Profile = sequelizeConnection.define(
  'profiles',
  {
    age: {
      type: DataType.STRING
    },
    profileName: {
      type: DataType.STRING
    },
    profileDescription: {
      type: DataType.STRING
    },
    profilePic: {
      type: DataType.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false // Will not generate createdAt , updatedAt field
  }
)

export default Profile
