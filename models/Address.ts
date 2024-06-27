import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

const Address = sequelizeConnection.define(
  'address',
  {
    line_one: {
      type: DataType.STRING,
      allowNull: true
    },
    line_two: {
      type: DataType.STRING,
      allowNull: true
    },
    line_three: {
      type: DataType.STRING,
      allowNull: true
    },
    city: {
      type: DataType.STRING,
      allowNull: true
    },
    state: {
      type: DataType.STRING,
      allowNull: true
    },
    postal_code: {
      type: DataType.INTEGER
    }
  },
  {
    freezeTableName: true,
    timestamps: false // Will not generate createdAt , updatedAt field
  }
)

export default Address
