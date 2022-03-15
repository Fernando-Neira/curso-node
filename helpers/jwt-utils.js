const jsonwebtoken = require("jsonwebtoken")

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email }

    jsonwebtoken.sign(payload, process.env.SECRET_JWT, {expiresIn: '1h'}, (err, token) => {
      if (err) {
        console.log(err)
        reject('Error al generar token')
      }

      resolve(token)
    })

  })
}

module.exports = {
  generateJWT
}