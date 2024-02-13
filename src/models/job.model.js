import mongoose, { Schema } from "mongoose";
const jobSchema = new Schema(
	{
		company: {
			type: String,
			required: [true, "Please provide company name"],
		},
		position: {
			type: String,
			required: [true, "Please provide position"],
		},
		status: {
			type: String,
			enum: ["Interview", "Declined", "Pending"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		jobType: {
			type: String,
			enum: ["Full Time", "Part Time", "Remote", "Internship"],
			default: "full-time",
		},
		jobLocation: {
			type: String,
			default: "India",
		},
	},
	{ timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
