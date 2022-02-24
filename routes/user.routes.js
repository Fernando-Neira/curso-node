const { Router } = require('express')
const { check } = require('express-validator')
const { usersPOST, usersGET } = require('../controllers/users.controller')
const { isValidRole, emailNotExist } = require('../helpers/database-validators')
const { fieldValidation } = require('../middlewares/fields-validation')

const router = Router()

router.get('/', usersGET)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(isValidRole),
    fieldValidation
], usersPOST)

routes.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').isLength({ min: 6 }),
    //check('role', 'No es un rol definido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom(emailNotExist),
    check('role').custom(isValidRole),
    fieldValidation
], usersPOST)

module.exports = router