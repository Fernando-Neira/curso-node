const { Router } = require('express')
const { check } = require('express-validator')
const { search } = require('../controllers/search.controller')
const { fieldValidation, jwtValidate, isAdminValidation } = require('../middlewares')

const router = Router()

router.get('/:collection', search)

module.exports = router