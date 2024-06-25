import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

import { RoleType } from '../types/defaultenumtype'

const Role = sequelizeConnection.define(
  'roles',
  {
    role_mame: {
      type: DataType.STRING,
      defaultValue: RoleType.anonymous
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

export default Role
