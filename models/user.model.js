const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
		type: String,
		required: [true, 'El nombre es requerido']
	},
	email: {
		type: String,
		required: [true, 'El email es requerido']
	},
	password: {
		type: String,
		required: [true, 'El contraseña es requerida']
	},
	image: {
		type: String
	},
	role: {
		type: String,
		required: true,
		enum: ['ADMIN_ROLE', 'USER_ROLE']
	},
	status: {
		type: Boolean,
		default: true
	},
	isGoogle: {
		type: Boolean,
		default: false
	}
})

module.exports = model('User', UserSchema)