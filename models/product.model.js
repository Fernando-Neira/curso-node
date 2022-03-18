const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
  },
  avalaible: {
    type: Boolean,
    default: true
  }
})

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...rest } = this.toObject()
  return rest;
}

module.exports = model('Product', ProductSchema)
