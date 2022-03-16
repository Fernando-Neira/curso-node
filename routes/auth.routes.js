const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')
const { fieldValidation } = require('../middlewares/fields-validation')

const router = Router()

router.post('/login', login, [
    check('email', 'El email debe ser valido').isEmail(),
    check('password', 'Debes ingresar la contrasena').not().isEmpty(),
    fieldValidation
])

router.post('/login-google', login, [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    fieldValidation
])

module.exports = router