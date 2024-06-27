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
Profile.hasOne(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
User.belongsTo(Profile, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// User association with role- one to many
User.belongsToMany(Role, {
  through: 'usersrole',
  timestamps: false
})
Role.belongsToMany(User, {
  through: 'usersrole',
  timestamps: false
})

// Address association with country- one to one
Country.hasOne(Address, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Address.belongsTo(Country, {
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
  through: 'usersproduct',
  timestamps: false
})
Product.belongsToMany(User, {
  through: 'usersproduct',
  timestamps: false
})

async function initModels() {
  await sequelizeConnection.sync({ alter: true })
}

export { User, Address, Profile, Role, Country, Capital, Product, initModels }
