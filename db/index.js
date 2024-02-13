import mongoose from "mongoose";
const connectDB = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URL}/jobApplication`);
		console.log("Mongo db connected");
	} catch (err) {
		console.log("Mongo DB ERROR:", err);
	}
};
export default connectDB;
