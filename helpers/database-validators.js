const {
    Category,
    Role,
    User,
    Product
} = require("../models/")

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role })

    if (!existRole) {
        throw new Error(`El rol: ${role}, no existe en la base de datos`)
    }

}

const emailNotExist = async (email = '') => {
    const existEmail = await User.findOne({ email })

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

const categoryIdExist = async (id = '') => {
    const category = await Category.findById(id)

    if (!category) {
        throw new Error(`ID ${id}, no existe!`)
    }
}

const productIdExist = async (id = '') => {
    const product = await Product.findById(id)

    if (!product) {
        throw new Error(`ID ${id}, no existe!`)
    }
}

module.exports = {
    isValidRole,
    emailNotExist,
    userIdExist,
    categoryIdExist,
    productIdExist
}
