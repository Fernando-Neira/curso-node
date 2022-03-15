const fieldsValidation = require('./fields-validation')
const jwtValidation = require('./jwt-validation')
const roleValidation = require('./role-validation')

module.exports = {
  ...fieldsValidation,
  ...jwtValidation,
  ...roleValidation
}