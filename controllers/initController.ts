import { Role, Country, Capital } from '../models/index'
import xlsx from 'xlsx'

const uploadCountryAndCapital = async (country_name: string, capital_name: string) => {
  try {
    const countryInsert: any = await Country.create({ country_name: country_name })
    const countryId = countryInsert.id
    if (countryId) {
      const capitalInsert: any = await Capital.create({ capital_name: capital_name, countryId: countryId })
      const capitalId = capitalInsert.id
      if (!capitalId) {
        console.log(`Error to create capital, country ${capitalId}`)
      }
      console.log(capitalId)
    }
  } catch (err) {
    throw new Error(`Error to create country, ${err}`)
  }
}

const generateCountryAndCapital = async () => {
  const workbook = xlsx.readFile('static/WorldCountriesListTables.xlsx')
  const xl_Row_Object = xlsx.utils.sheet_to_json(workbook.Sheets['World'])
  const sorted_Xl_Row_Object: any = xl_Row_Object.sort((a: any, b: any) => {
    const nameA = a.Country.toUpperCase() // ignore upper and lowercase
    const nameB = b.Country.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
  for (const item of sorted_Xl_Row_Object) {
    await uploadCountryAndCapital(item['Country'], item['Capital City'])
  }
}

const uploadRole = async (role_name: string) => {
  try {
    const roleInsert: any = await Role.create({ role_name: role_name })
    const roleId = roleInsert.id
    if (roleId) {
      console.log(roleId)
    }
  } catch (err) {
    throw new Error(`Error to create country, ${err}`)
  }
}

const generateRoles = async () => {
  const workbook = xlsx.readFile('static/Role.xlsx')
  const xl_Row_Object: any = xlsx.utils.sheet_to_json(workbook.Sheets['Role'])
  for (const item of xl_Row_Object) {
    await uploadRole(item['Role'])
  }
}

export const initController = async () => {
  try {
    const dataCreation = await Promise.allSettled([generateCountryAndCapital(), generateRoles()])
    console.log('dataCreation', dataCreation)
  } catch (err) {
    throw new Error(`Error to create initController, ${err}`)
  }
}
