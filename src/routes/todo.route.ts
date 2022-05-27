import express from "express";
import {
	createTodo,
	updateTodo,
	deleteTodo,
	markTodoAsCompleted,
	fetchTodosByCreator,
} from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router
	.route("/")
	.post(authenticate, createTodo)
	.get(authenticate, fetchTodosByCreator);
router
	.route("/:id")
	.patch(authenticate, updateTodo)
	.delete(authenticate, deleteTodo);
router.route("/:id/completed").patch(authenticate, markTodoAsCompleted);

export default router;
