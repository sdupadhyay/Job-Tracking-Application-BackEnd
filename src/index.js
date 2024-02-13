import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config();
const port = process.env.PORT || 3000;
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is runnig at port number ${port}`);
		});
	})
	.catch((err) => console.log(`Mongo DB Connection Failed, error ${err}`));
