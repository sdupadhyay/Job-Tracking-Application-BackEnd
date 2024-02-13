import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const options = {
	httpOnly: true,
	secure: true,
};
const register = async (req, res) => {
	//console.log(req.files);

	try {
		const { firstName, lastName, email, password } = req.body;
		if (
			[firstName, lastName, email, password].some(
				(field) => field?.trim() === ""
			)
		)
			throw new ApiError(400, "All Fields are Required");
		const existingUser = await User.findOne({ email });
		if (existingUser) throw new ApiError(409, "Email Already Exist");
		let avatarPath = req.files?.avatar[0]?.path;
		if (!avatarPath) throw new ApiError(400, "Avatar File is Required");
		const avatar = await uploadOnCloudinary(avatarPath);
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			avatar: avatar?.url,
		});

		//const token = user.generateToken();
		return res.status(201).json({
			user: {
				email: user?.email,
				firstName: user?.firstName,
				lastName: user?.lastName,
				avatar: user?.avatar,
			},
		});
	} catch (err) {
		console.log("ERROR", err);
		res.status(400).json({ error: err });
	}
};
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			throw new ApiError(400, "Please provide Email and Password");
		const user = await User.findOne({ email });
		if (!user) throw new ApiError(400, "Invalid Credentials");
		const isPassword = await user.isPasswordCorrect(password);
		if (!isPassword) throw new ApiError(400, "Invalid Credentials");
		const token = user.generateToken();
		res
			.status(200)
			.cookie("Token", token, options)
			.json({ message: "Login Sucessfully " });
	} catch (err) {
		console.log("ERROR", err);
		res.status(400).json({ error: err });
	}
};
const logout = async (req, res) => {
	try {
		//console.log(req.userId);
		res
			.status(200)
			.clearCookie("Token", options)
			.json({ message: "Logout Sucessfully" });
	} catch (err) {
		res.status(400).json({ message: "Something Went wrong" });
	}
};
export { register, login, logout };
