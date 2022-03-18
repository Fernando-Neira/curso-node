const { response } = require("express")

const isAdminValidation = (req, res = response, next) => {

  if (!req.authenticatedUser) {
    return res.status(500).json({
      msg: 'Error interno'
    })
  }

  const { role } = req.authenticatedUser

  if (role !== 'ROLE_ADMIN') {
    return res.status(401).json({
      msg: 'No tienes acceso a este recurso'
    })
  }

  next()
}

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.authenticatedUser) {
      return res.status(500).json({
        msg: 'Error interno'
      })
    }

    const { role } = req.authenticatedUser

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: 'No tienes acceso a este recurso'
      })
    }

    next()
  }
}

module.exports = {
  isAdminValidation,
  hasRole
}
