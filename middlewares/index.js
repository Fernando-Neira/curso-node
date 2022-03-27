const fieldsValidation = require('./fields-validation')
const jwtValidation = require('./jwt-validation')
const roleValidation = require('./role-validation')
const fileValidation = require('./file-validation')

module.exports = {
  ...fieldsValidation,
  ...jwtValidation,
  ...roleValidation,
  ...fileValidation
}