import { Sequelize, DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

const Country = sequelizeConnection.define(
  'country',
  {
    country_mame: {
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

export default Country
