import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "Please provide Name"],
	},
	lastName: {
		type: String,
		required: [true, "Please Provide Last Name"],
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	avatar: {
		type: String, // cloudinary
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minlength: 6,
	},
});
// pre means Do something before saving the data into DB
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});
userSchema.methods.isPasswordCorrect = async function (userPassword) {
	const match = await bcrypt.compare(userPassword, this.password);
	return match;
};
userSchema.methods.generateToken = function () {
	let token = jwt.sign({ userId: this._id }, process.env.TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_EXPIRE,
	});
	return token;
};
export const User = mongoose.model("User", userSchema);
