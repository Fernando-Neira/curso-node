const Role = require("../models/role.model")
const User = require("../models/user.model")

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({role})

    if (!existRole) {
        throw new Error(`El rol: ${role}, no existe en la base de datos`)
    }

}

const emailNotExist = async (email = '') => {
    const existEmail = await User.findOne({email})

    if (!existEmail) {
        throw new Error(`El email: ${email}, no existe en la base de datos`)
    }

}

const userIdExist = async (id = '') => {
    const user = await User.findById(id)

    if (!user) {
        throw new Error(`ID ${id}, no existe!`)
    }

}

module.exports = {
    isValidRole,
    emailNotExist,
    userIdExist
}