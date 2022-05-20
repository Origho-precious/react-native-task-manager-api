import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction, Request } from "express";
import { IRequest } from "../interfaces/IRequest.interface";
import VerificationToken from "../models/verificationToken.model";

dotenv.config();

export const authenticate = (
	req: IRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { authorization } = req.headers;
		let decoded: any;

		if (authorization) {
			try {
				const token = authorization.split(" ")[1];
				decoded = jwt.verify(token, process.env.JWT_SECRET as string);
			} catch (error) {
				return res.status(410).json({
					message: "Session expired, you have to login.",
				});
			}

			req.decoded = decoded;
			return next();
		}
		return res.status(401).json({
			message: "Sorry, you have to login.",
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: "Server Error",
		});
	}
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
	if (
		req.headers["x-api-key"] &&
		req.headers["x-api-key"] === process.env.API_KEY
	) {
		return next();
	}
	res.status(403).send({ message: "Access denied" });
};

export const verifyResetPasswordToken = async (
	req: IRequest,
	res: Response,
	next: NextFunction
) => {
	let token = req.headers.authorization;
	if (token && token.startsWith("Bearer")) {
		try {
			token = token.split(" ")[1];
			const tokenFound = await VerificationToken.findOne({ token });
			let decoded: any;

			if (!tokenFound) {
				return res.status(401).json({ message: "token is invalid!" });
			}
			const dateCreated = new Date(tokenFound.createdAt).getTime();
			const tokenIsExpired = dateCreated + 900000 < new Date().getTime();

			if (tokenIsExpired) {
				await VerificationToken.deleteOne({ token });
				return res
					.status(401)
					.json({ message: "Token expired, please start over!" });
			}

			try {
				decoded = jwt.verify(token, process.env.JWT_SECRET as string);
				req.token = token;
				req.decoded = decoded;
				next();
			} catch (error) {
				console.error(error);
				res.status(401).json({ message: "Not authorized, invalid token!" });
			}
		} catch (error) {
			res.status(401).json({ message: "Something went wrong!" });
		}
	}

	if (!token) {
		res.status(401).json({ message: "Not authorized, no token found" });
	}
};
