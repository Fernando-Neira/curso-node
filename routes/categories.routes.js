const { Router } = require('express')
const { check } = require('express-validator')
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory
} = require('../controllers/category.controller')
const { categoryIdExist } = require('../helpers/database-validators')
const { fieldValidation, jwtValidate, isAdminValidation } = require('../middlewares')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(categoryIdExist),
  fieldValidation
], getCategoryById)

router.post('/', [
  jwtValidate,
  check('name', 'Se requiere el nombre').not().isEmpty()
], createCategory)

router.put('/', [
  jwtValidate,
  check('name', 'Se requiere el nombre').not().isEmpty(),
  check('id', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(categoryIdExist),
  fieldValidation
], updateCategory)

router.delete('/:id', [
  jwtValidate,
  isAdminValidation,
  check('id', 'No es un id valido de mongo').isMongoId(),
  check('id').custom(categoryIdExist),
  fieldValidation
], deleteCategory)

module.exports = router
