import { LoginResponse } from "../models";
import { Resource } from "./resource";

export class Auth extends Resource {
	public async login(username: string, password: string): Promise<LoginResponse> {
		return this.post("login", { username, password });
	}
}
