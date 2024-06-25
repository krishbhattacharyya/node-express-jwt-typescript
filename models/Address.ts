import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

const Address = sequelizeConnection.define(
  'address',
  {
    line_one: {
      type: DataType.INTEGER
    },
    line_two: {
      type: DataType.INTEGER
    },
    line_three: {
      type: DataType.INTEGER
    },
    city: {
      type: DataType.STRING
    },
    state: {
      type: DataType.STRING
    },
    postal_code: {
      type: DataType.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false // Will not generate createdAt , updatedAt field
  }
)

export default Address
