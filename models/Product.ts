import { DataType } from 'sequelize-typescript'
import { sequelizeConnection } from '../database/index'

import { RoleType } from '../types/defaultenumtype'

const Product = sequelizeConnection.define(
  'product',
  {
    product_mame: {
      type: DataType.STRING,
      defaultValue: RoleType.anonymous
    },
    product_deccrition: {
      type: DataType.STRING
    },
    product_price: {
      type: DataType.INTEGER,
      defaultValue: 0
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

export default Product
