import Mongoose from "mongoose";
import User from "./user.model";

const { Schema } = Mongoose;

const taskSchema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		text: {
			type: String,
			required: false,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
		},
		isCompleted: {
			type: Boolean,
			required: true,
			trim: true,
		},
		users: [User],
	},
	{ timestamps: true }
);

const Task = Mongoose.model("Task", taskSchema);

export default Task;
