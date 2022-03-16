const bcryptjs = require("bcryptjs");
const { response, json } = require("express");
const User = require("../models/user.model");
const { generateJWT } = require('../helpers/jwt-utils');
const { googleVerify } = require("../helpers/google-jwt-validator");

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
      res.status(500).json({
        msg: 'Error interno'
      })
    }
}

const googleSignIn = async (req, res = response) => {
  const { id_token } = res.body

  try {
    
    const {email, name, picture} = await googleVerify(id_token)

    const user = await User.findOne({email})

    if (!user) {
      const data = {
        email,
        name,
        password: 'google-auth',
        image: picture,
        role: '',
        status: true,
        isGoogle: true
      }

      user = new User(data)
      await user.save()
    }

    if (!user.status) {
      res.status(401).body({
        msg: 'Usuario deshabilitado'
      })
    }

    const token = await generateJWT(user.id)

    res.json({
      msg: 'Login oK',
      user,
      token
    })   

  } catch (error) {
    res.json.status(400).body({
      msg: 'Error al validar token google'
    })
  }

}

module.exports = {
    login
}