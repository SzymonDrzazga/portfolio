const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchema = Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	headAdmin: {
		type: Boolean,
		default: false,
	},
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
