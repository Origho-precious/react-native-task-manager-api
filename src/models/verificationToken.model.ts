import Mongoose from "mongoose";

const { Schema } = Mongoose;

const verificationSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const VerificationToken = Mongoose.model(
	"verificationToken",
	verificationSchema
);

export default VerificationToken;
