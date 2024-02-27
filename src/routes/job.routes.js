import { Router } from "express";
import {
	createJob,
	deleteJob,
	getAllJob,
	getJob,
	updateJob,
} from "../controllers/job.js";
const router = Router();
router.route("/").post(createJob).get(getAllJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);
export default router;
