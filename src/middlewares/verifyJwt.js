import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
export default async function verifyJwt(req, res, next) {
	try {
		const token = req?.cookies?.Token;
		if (!token) return res.status(401).json({ messgae: "UnAuthorised Acess" });
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!decodedToken) return res.status("402", "Something Went Wrong");
		req.userId = decodedToken?.userId;
		next();
	} catch (error) {
		console.log("error", error);
	}
}
