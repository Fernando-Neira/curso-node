const { response } = require("express");
const Category = require("../models/category.model");

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase()
  const categoryBD = await Category.findOne({ name })

  if (categoryBD) {
    return res.status(400).json({
      msg: `Categoria ${categoryBD.name} ya existe en base de datos`
    })
  }

  const data = {
    name,
    user: req.authenticatedUser._id
  }

  const newCategoryBD = await Category(data)

  await newCategoryBD.save()

  res.json(201).json(newCategoryBD)
}

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query

  const query = { estado: true }
  /*const usuarios = await User.find({estado: true})
      .skip(from)
      .limit(Number(limit))

  const quantity = await User.countDocuments({estado: true})
*/

  const [quantity, users] = Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(from)
      .limit(Number(limit))
  ])


  res.json({ quantity, users })
}

const getCategoryById = async (req, res = response) => {
  const { id } = req.body
  const categoryDB = await Category.findById(id).populate('user', 'name')

  res.json(categoryDB)
}

const updateCategory = async (req, res = response) => {
  const { id } = req.body
  const { status, user, ...data } = req.body

  data.name = data.name.toUpperCase()
  data.user = req.authenticatedUser._id

  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  res.json(category)
}

const deleteCategory = async (req, res = response) => {
  const { id } = req.body
  const deletedCategory = await Category.findByIdAndUpdate(id, { estado: false }, { new: true })
  res.json(deletedCategory)
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}
