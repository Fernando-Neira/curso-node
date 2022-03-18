const { response } = require('express')
const jsonWebToken = require('jsonwebtoken')
const User = require('../models/user.model')

const jwtValidate = async (req, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'Ruta requiere autenticación'
    })
  }

  try {
    
    const { uid } = jsonWebToken.verify(token, process.env.SECRET_JWT)

    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: 'Usuario no existe en la base de datos'
      })
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'No estas habilitado para acceder al sistema'
      })
    }

    //pasar usuario autenticado al router
    req.authenticatedUser = user


    next()
  } catch (error) {
    return res.status(400).json({
      msg: 'Token invalido'
    })
  }
}

module.exports = {
  jwtValidate
}
