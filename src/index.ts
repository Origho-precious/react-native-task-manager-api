import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db";
import userRoutes from "./routes/user.route";
import resetPasswordRoutes from "./routes/reset-password.route";

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", resetPasswordRoutes);

if (process.env.NODE_ENV === "dev") {
	app.use("/", (_req, res) => {
		res.send(`Organizo API running on port ${process.env.PORT}`);
	});
}

const PORT = process.env.PORT || 5500;

app.listen(process.env.PORT, () => {
	console.log(
		`⚡️[Server] is running in ${process.env.NODE_ENV} on PORT:${PORT}`
	);
});
