const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user.model')

const usersGET = (req = request, res = response) => {
    
    const { limit = 5, from = 0 } = req.query

    /*const usuarios = await User.find({estado: true})
        .skip(from)
        .limit(Number(limit))

    const quantity = await User.countDocuments({estado: true})
*/

    const [quantity, users] = Promise.all([
        User.countDocuments({estado: true}),
        User.find({estado: true})
         .skip(from)
         .limit(Number(limit))
    ])


    res.json({quantity, users})
}

const usersPOST = async (req = request, res = response) => {

    const { name, email, password } = req.body

    //validar si correo ya existe
    const emailExist = await User.findOne({ email })

    if (emailExist) {
        return res.status(400).json({
            message: 'Email ya se encuentra registrado.'
        })
    }

    const user = new User({ name, email, password })


    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.json({user})
}

const usersPUT = async (req = request, res = response) => {

    const { id } = req.params
    const { _id, password, isGoogle, email, ...rest } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)
    
    res.json({user})

}

module.exports = {
    usersGET,
    usersPOST,
    usersPUT
}