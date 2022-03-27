const { response } = require("express");
const fs = require("fs");
const path = require("path");
const { uploadFile } = require('../helpers');
const { User, Product } = require("../models/");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFiles = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: 'No se recibio ningun archivo'
    })
  }

  try {
    const {filename, path} = await uploadFile(req.files, )
    
    res.json({
      filename,
      path
    })

  }catch(error) {
    res.status(400).json({msg: error})
  }
}

/*const updateImage = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: 'No se recibio ningun archivo'
    })
  }

  const { id, collection } = req.params

  let model 

  switch (collection) {
    case 'users':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe el usuario con id ${id}`
        })
      }
      break;

    case 'products':
      model = await Product.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe el producto con id ${id}`
        })
      }
      break
  }

  if (model.image) {
    const path = path.join(__dirname, '../uploads', collection, model.image)
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
  }

  const { filename } = await uploadFile(req.files, undefined, collection)

  model.image = filename

  await model.save()

  res.json(model)
}*/

const updateImageCloudinary = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: 'No se recibio ningun archivo'
    })
  }

  const { id, collection } = req.params

  const model = getModel(collection, id, res)

  if (model.image) {
    const nameArr = model.image.split('/')
    const name = nameArr[nameArr.length - 1]
    const [public_id] = name.split('.')

    cloudinary.uploader.destroy(public_id)
  }

  const { tempFilePath } = req.files.file

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  model.image = secure_url

  await model.save()

  res.json(model)
}

/*const showImage = async (req, res = response) => {

  const { id, collection } = req.params

  const model = getModel(collection, id, res)

  if (model.image) {
    const path = path.join(__dirname, '../uploads', collection, model.image)
    if (fs.existsSync(path)) {
      return res.sendFile(path)
    }
  }

  res.status(404).json({
    msg: 'No existe imagen para este id'
  })
}*/

const showImageCloudinary = async (req, res = response) => {

  const { id, collection } = req.params

  const model = getModel(collection, id, res)

  if (model.image) {
    return res.sendFile(model.image)
  }

  res.status(404).json({
    msg: 'No existe imagen para este id'
  })
}

const getModel = (collection, id, res) => {
  let model 

  switch (collection) {
    case 'users':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe el usuario con id ${id}`
        })
      }
      break;

    case 'products':
      model = await Product.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe el producto con id ${id}`
        })
      }
      break
  }

  return model
}

module.exports = {
  uploadFiles,
  updateImage: updateImageCloudinary,
  showImage: showImageCloudinary
}