const { Router } = require('express')
const { check } = require('express-validator')
const { uploadFiles, updateImage, showImage } = require('../controllers/uploads.controller')
const { allowedCollections } = require('../helpers')
const { fieldValidation, includeFile } = require('../middlewares')

const router = Router()

router.post('/', includeFile, uploadFiles)

router.put('/:collection/:id', [
  includeFile,
  check('id', 'El id debe ser un valido').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  fieldValidation
], updateImage)

router.get('/:collection/:id', [
  check('id', 'El id debe ser un valido').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  fieldValidation
], showImage)

module.exports = router
