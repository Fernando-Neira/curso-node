const { response } = require("express");
const Product = require("../models");

const createProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body
  const productDB = await Product.findOne({name: body.name})

  if(productDB) {
    return res.status(400).json({
      msg: `Producto ${productDB.name} ya existe en base de datos`
    })
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.authenticatedUser._id
  }

  const newProductBD = await Product(data)
  
  await newProductBD.save()

  res.json(201).json(newProductBD)
}

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query

  const query = {estado: true}
  /*const usuarios = await User.find({estado: true})
      .skip(from)
      .limit(Number(limit))

  const quantity = await User.countDocuments({estado: true})
*/

  const [quantity, products] = Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(from)
        .limit(Number(limit))
  ])


  res.json({quantity, products})
}

const getProductById = async (req, res = response) => {
  const {id} = req.body
  const productDb = await Product
                            .findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name')
  
  res.json(productDb)
}

const updateProduct = async (req, res = response) => {
  const {id} = req.body
  const {status, user, ...data} = req.body

  if (data.name) {
    data.name = data.name.toUpperCase()
  }

  data.user = req.authenticatedUser._id
  
  const productDB = await Product.findByIdAndUpdate(id, data, {new: true})

  res.json(productDB)
}

const deleteProduct = async (req, res = response) => {
  const {id} = req.body
  const deletedProduct = await Product.findByIdAndUpdate(id, {estado: false}, {new: true})
  res.json(deletedProduct)
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}