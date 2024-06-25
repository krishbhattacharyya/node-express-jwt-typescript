import { sequelizeConnection } from '../database/index'
import User from './User'
import Address from './Address'
import Profile from './Profile'
import Role from './Role'
import Country from './Country'
import Capital from './Capital'
import Product from './Product'

// User association with address- one to many
User.hasMany(Address, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Address.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// User association with profile- one to one
User.hasOne(Profile, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Profile.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// User association with role- one to many
User.hasMany(Role, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Role.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// Address association with country- one to one
Address.hasOne(Country, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Country.belongsTo(Address, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// Country association with capital- one to one
Country.hasOne(Capital, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Capital.belongsTo(Country, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// User association with product- many to many
User.belongsToMany(Product, {
  through: 'userproduct'
})
Product.belongsToMany(User, {
  through: 'userproduct'
})

async function initModels() {
  await sequelizeConnection.sync({ alter: true })
}

export { User, Address, Profile, Role, Country, Capital, Product, initModels }
