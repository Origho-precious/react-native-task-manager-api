import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db";

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

if (process.env.NODE_ENV === "dev") {
	app.use("/", (_req, res) => {
		res.send(`Risecoin API running on port ${process.env.PORT}`);
	});
}

const PORT = process.env.PORT || 5500;

app.listen(process.env.PORT, () => {
	console.log(
		`⚡️[Server] is running in ${process.env.NODE_ENV} on PORT:${PORT}`
	);
});
