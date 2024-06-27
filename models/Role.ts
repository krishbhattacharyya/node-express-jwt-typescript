import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

import { RoleType } from '../types/defaultenumtype'

const Role = sequelizeConnection.define(
  'roles',
  {
    role_name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

export default Role
