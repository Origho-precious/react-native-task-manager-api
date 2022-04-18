import { IUser } from "./IUser.interface";

export interface ITask {
	text: string;
	type: "work" | "personal" | "shared";
	isCompleted: boolean;
	createdAt: string;
	creator: string;
  users: IUser[];
}
