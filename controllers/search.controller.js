const { response } = require('express');
const { json } = require('express/lib/response');
const {User, Category, Product, Role} = require('../models/');
const { ObjectId } = require('mongoose').Types

const allowedCollections = [
  'users',
  'categories',
  'products',
//  'roles'
]

const search = (req, res = response) => {

  const { collection, term } = req.params

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Colección ${collection} no esta permitida`
    })
  }

  switch(collection) {
    case 'users':
      searchUser(term, res)
      break
    case 'categories':
      searchCategories(term, res)
      break
    case 'products':
      searchProducts(term, res)
      break
  }
}

const searchUser = async (term, res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const user = await User.findById(term)

    return res.json({results: user ? [user] : []})
  }

  const regExp = new RegExp(term, 'i')
  const users = await User.find({
    $or: [
      {name: regExp},
      {email: regExp}
    ],
    $and: [
      {status: true}
    ]
  })

  res.json({results: users})
}

const searchCategories = async (term, res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const category = await Category.findById(term)

    return res.json({results: category ? [category] : []})
  }

  const regExp = new RegExp(term, 'i')
  const categories = await Category.find({name: regExp, status: true})

  res.json({results: categories})
}

const searchProducts = async (term, res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const product = await Product.findById(term)
                                  .populate('category', 'name')
                                  .populate('user', 'name')

    return res.json({results: product ? [product] : []})
  }

  const regExp = new RegExp(term, 'i')
  const categories = await Product.find({name: regExp, status: true})
                                  .populate('category', 'name')
                                  .populate('user', 'name')

  res.json({results: categories})
}
 
module.exports = {
  search
}