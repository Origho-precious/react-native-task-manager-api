import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { IRequest } from "../interfaces/IRequest.interface";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export const authenticateUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!email || !password) {
		res.status(422).json({ message: "Required field(s) not found!" });
	} else if (!user) {
		res.status(404).json({ message: "Account not found!" });
	} else {
		bcrypt.compare(password, user.password, (err, same) => {
			if (same) {
				const token = generateToken(user._id);
				res.status(200).json({
					id: user._id,
					fullName: user.fullName,
					email: user.email,
					token,
				});
			} else {
				res.status(401).json({ message: "Incorrect email or password!" });
			}
		});
	}
};

export const createUser = async (req: IRequest, res: Response) => {
	const { email, fullName, password } = req.body;
	const emailExists = await User.findOne({ email });

	if (!email || !password || !fullName) {
		res.status(422).json({ message: "Please enter required field(s)" });
	} else if (emailExists) {
		res.status(409).json({ message: `Account with ${email} already exists` });
	} else {
		try {
			const hashedPassword = bcrypt.hashSync(password, 10);
			const userData = { fullName, email, password: hashedPassword };

			const user = await User.create(userData);

			res.status(201).json({
				id: user._id,
				fullName: user.fullName,
				email: user.email,
				authToken: generateToken(user._id),
			});
		} catch (error: any) {
			res.status(201).json({
				message: "Something went wrong!",
			});
		}
	}
};
