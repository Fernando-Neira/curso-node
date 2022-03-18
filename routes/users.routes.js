const { Router } = require('express')
const { check } = require('express-validator')
const { usersPOST, usersGET, usersDELETE } = require('../controllers/users.controller')
const { isValidRole, emailNotExist, userIdExist } = require('../helpers/database-validators')
const { fieldValidation, jwtValidate, isAdminValidation, hasRole } = require('../middlewares')

const router = Router()

router.get('/', usersGET)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(isValidRole),
    fieldValidation
], usersPOST)

router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').isLength({ min: 6 }),
    //check('role', 'No es un rol definido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom(emailNotExist),
    check('role').custom(isValidRole),
    fieldValidation
], usersPOST)

router.delete('/:id', [
    jwtValidate,
    isAdminValidation,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
    fieldValidation
], usersDELETE)

module.exports = router