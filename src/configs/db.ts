import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI as string, {});
		console.log(
			`connected to MongoDB in ${process.env.NODE_ENV} mode on ${connect.connection.host}`
		);
	} catch (error: any) {
		console.log(
			`Connection to database in ${process.env.NODE_ENV} environment did not succeed`
		);
		return error.message;
	}
};

export default connectDB;
