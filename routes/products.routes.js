const { Router } = require('express')
const { check } = require('express-validator')
const { getCategories } = require('../controllers/category.controller')
const { getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productos.controller')
const { categoryIdExist, productIdExist } = require('../helpers/database-validators')
const { fieldValidation, jwtValidate, isAdminValidation } = require('../middlewares')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(categoryIdExist),
  fieldValidation
], getProductById)

router.post('/', [
  jwtValidate,
  check('name', 'Se requiere el nombre').not().isEmpty(),
  check('category', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(categoryIdExist),
  fieldValidation
], createProduct)

router.put('/', [
  jwtValidate,
  check('id', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(productIdExist),
  fieldValidation
], updateProduct)

router.delete('/:id',[
  jwtValidate,
  isAdminValidation,
  check('id', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(productIdExist),
  fieldValidation
], deleteProduct)

module.exports = router
