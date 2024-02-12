import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
export { register };
