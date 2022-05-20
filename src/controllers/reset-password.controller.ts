import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateResetPasswordToken } from "../utils/generateToken";
import Mailer from "../services/mailer.services";
import VerificationToken from "../models/verificationToken.model";
import { IRequest } from "../interfaces/IRequest.interface";
import User from "../models/user.model";

const mailer = new Mailer();

export const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	const userExists = await User.findOne({ email });

	if (!email) {
		res.status(401).json({ message: "Please enter your email address." });
	}

	if (!userExists) {
		res.status(404).json({ message: "Account with this email not found!" });
	} else {
		const token = generateResetPasswordToken(email);

		try {
			await mailer.forgotPassword(email, token);
      await VerificationToken.create({ token, type: "reset-password" });
      
			res.status(200).json({ message: "Reset password link sent!" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Something went wrong!" });
		}
	}
};

export const resetPassword = async (req: IRequest, res: Response) => {
	const { password } = req.body;
	const { token, decoded } = req;
	const email = decoded?.email as string;

	if (!password) {
		res.status(401).json({ message: "Please, enter your new password" });
	} else {
		const user = await User.findOne({ email });

		if (user) {
			const hashPassword = bcrypt.hashSync(password, 10);
			user.password = hashPassword;
			await user.save();
      await VerificationToken.deleteOne({ token });
      
			res.status(200).json({ message: "Password reset successful!" });
		} else {
			res.status(404).json({ message: "Account with this email not found!" });
		}
	}
};
