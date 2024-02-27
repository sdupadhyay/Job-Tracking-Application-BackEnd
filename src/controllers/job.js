import { Job } from "../models/job.model.js";

const createJob = async (req, res) => {
	try {
		req.body.createdBy = req.userId;
		await Job.create(req.body);

		res.status(200).json({ message: "Job Added Sucessfully " });
	} catch (err) {
		res.status(400).json({ message: "Something Went Wrong", err: err.message });
	}
};
const getAllJob = async (req, res) => {
	try {
		const jobs = await Job.find({ createdBy: req?.userId });
		res.status(200).json({ data: jobs });
	} catch (err) {
		res.status(400).json({ message: "Something went wong", err });
	}
};
const getJob = async (req, res) => {
	try {
		const { id } = req?.params;
		const job = await Job.findOne({ _id: id, createdBy: req?.userId });
		res.status(200).json({ data: job });
	} catch (err) {
		res.status(404).json({ message: "Somethgnwent" });
	}
};
const updateJob = async (req, res) => {
	try {
		const { id } = req?.params;
		const updated_Job = await Job?.findByIdAndUpdate(
			{ _id: id, createdBy: req?.userId },
			req.body,
			{ new: true, runValidators: true }
		);
		res.status(200).json({ message: "Data Updated sucessfully" });
	} catch (err) {
		res.status(400).json({ err });
	}
};
const deleteJob = async (req, res) => {
	try {
		const { id } = req?.params;
        await Job.findByIdAndDelete({ _id: id })
        res.status(200).json({message:"Deleted Sucessfully"})
	} catch (err) {
        res.status(400).json({err})
    }
};
export { createJob, getAllJob, getJob, updateJob,deleteJob };
