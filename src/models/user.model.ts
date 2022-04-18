import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: false,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const User = Mongoose.model("User", userSchema);

export default User;
