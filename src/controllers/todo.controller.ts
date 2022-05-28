import { Response } from "express";
import { IRequest } from "../interfaces/IRequest.interface";
import Todo from "../models/todo.model";

export const createTodo = async (req: IRequest, res: Response) => {
	const { text, date, type } = req.body;

	if (!text || !date || !type) {
		res.status(422).json({ message: "Required field(s) not found!" });
	} else {
		try {
			const todoData = {
				creator: req?.decoded?.id,
				text,
				date,
				type,
				isCompleted: false,
			};

			await Todo.create(todoData);

			const response = await Todo.find({
				creator: req?.decoded?.id,
				isCompleted: false,
			}).populate("creator", "id fullName email");

			const todos = response.map((todo) => {
				return {
					id: todo._id,
					creator: todo.creator,
					text: todo.text,
					date: todo.date,
					type: todo.type,
					isCompleted: todo.isCompleted,
				};
			});

			res.status(201).json(todos);
		} catch (error: any) {
			res.status(500).json({
				message: error?._message ? error?._message : "Something went wrong!",
			});
		}
	}
};

export const updateTodo = async (req: IRequest, res: Response) => {
	const { id } = req.params;
	const { text, date, type } = req.body;

	if (!id) {
		res.status(422).json({ message: "Required property not found!" });
	} else if (!text && !date && !type) {
		res.status(422).json({ message: "Required field(s) not found!" });
	} else {
		try {
			const todo = await Todo.findById(id);

			if (todo) {
				if (text) {
					todo.text = text;
				}

				if (date) {
					todo.date = date;
				}

				if (type) {
					todo.type = type;
				}

				await todo.save();

				const response = await Todo.find({
					creator: req?.decoded?.id,
					isCompleted: false,
				}).populate("creator", "id fullName email");

				const todos = response.map((todo) => {
					return {
						id: todo._id,
						creator: todo.creator,
						text: todo.text,
						date: todo.date,
						type: todo.type,
						isCompleted: todo.isCompleted,
					};
				});

				res.status(200).json(todos);
			} else {
				res.status(404).json({ message: "Todo not found!" });
			}
		} catch (error) {
			res.status(500).json({ message: "Something went wrong!" });
		}
	}
};

export const markTodoAsCompleted = async (req: IRequest, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(422).json({ message: "Required property not found!" });
	} else {
		try {
			const todo = await Todo.findById(id);

			if (todo) {
				todo.isCompleted = true;

				await todo.save();

				const response = await Todo.find({
					creator: req?.decoded?.id,
					isCompleted: false,
				}).populate("creator", "id fullName email");

				const todos = response.map((todo) => {
					return {
						id: todo._id,
						creator: todo.creator,
						text: todo.text,
						date: todo.date,
						type: todo.type,
						isCompleted: todo.isCompleted,
					};
				});

				res.status(200).json(todos);
			} else {
				res.status(404).json({ message: "Todo not found!" });
			}
		} catch (error) {
			res.status(500).json({ message: "Something went wrong!" });
		}
	}
};

export const fetchTodosByCreator = async (req: IRequest, res: Response) => {
	try {
		const response = await Todo.find({
			creator: req?.decoded?.id,
			isCompleted: false,
		}).populate("creator", "id fullName email");

		const todos = response.map((todo) => {
			return {
				id: todo._id,
				creator: todo.creator,
				text: todo.text,
				date: todo.date,
				type: todo.type,
				isCompleted: todo.isCompleted,
			};
		});

		res.status(200).json(todos);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong!" });
	}
};

export const deleteTodo = async (req: IRequest, res: Response) => {
	const { id } = req.params;

	if (!id) {
		res.status(422).json({ message: "Required property not found!" });
	} else {
		try {
			const todo = await Todo.findById(id);

			if (todo) {
				await todo.remove();

				const response = await Todo.find({
					creator: req?.decoded?.id,
					isCompleted: false,
				}).populate("creator", "id fullName email");

				const todos = response.map((todo) => {
					return {
						id: todo._id,
						creator: todo.creator,
						text: todo.text,
						date: todo.date,
						type: todo.type,
						isCompleted: todo.isCompleted,
					};
				});

				res.status(200).json(todos);
			} else {
				res.status(404).json({ message: "Todo not found!" });
			}
		} catch (error) {
			res.status(500).json({ message: "Something went wrong!" });
		}
	}
};

// fetch completed todos by creator
export const fetchCompletedTodosByCreator = async (
	req: IRequest,
	res: Response
) => {
	try {
		const response = await Todo.find({
			creator: req?.decoded?.id,
			isCompleted: true,
		}).populate("creator", "id fullName email");

		const todos = response.map((todo) => {
			return {
				id: todo._id,
				creator: todo.creator,
				text: todo.text,
				date: todo.date,
				type: todo.type,
				isCompleted: todo.isCompleted,
			};
		});

		res.status(200).json(todos);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong!" });
	}
};
