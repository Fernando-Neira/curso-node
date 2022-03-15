const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user.model");
const { generateJWT } = require('../helpers/jwt-utils')

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({
          msg: 'Usuario o contraseNa incorrecto'
        })
      }

      if (!user.status) {
        return res.status(400).json({
          msg: 'Usuario se encuentra deshabilitado'
        })
      }

      const isValidPassword = bcryptjs.compareSync(password, user.password)

      if (!isValidPassword) {
        return res.status(400).json({
          msg: 'Usuario o contraseNa incorrecto'
        })
      }

      const token = await generateJWT(user.id)

      res.json({
        msg: 'Login oK',
        user,
        token
      })        
    }catch (error) {
      return res.status(500).json({
        msg: 'Error interno'
      })
    }
}

module.exports = {
    login
}