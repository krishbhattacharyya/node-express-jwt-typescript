import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

const Capital = sequelizeConnection.define(
  'capital',
  {
    capital_name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false // Will not generate createdAt , updatedAt field
  }
)

export default Capital
