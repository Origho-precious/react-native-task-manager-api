import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
};

export const generateResetPasswordToken = (email: string) => {
	return jwt.sign({ email }, process.env.JWT_SECRET as string, {
		expiresIn: "15m",
	});
};
