import express from "express";
import {
	createTodo,
	updateTodo,
	deleteTodo,
	markTodoAsCompleted,
	fetchTodosByCreator,
	fetchCompletedTodosByCreator,
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
router
	.route("/:id/completed")
	.patch(authenticate, markTodoAsCompleted)
	.get(authenticate, fetchCompletedTodosByCreator);
router.route("/completed").get(authenticate, fetchCompletedTodosByCreator);

export default router;
