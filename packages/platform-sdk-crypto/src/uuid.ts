import { v4 as uuidv4 } from "uuid";

export class UUID {
	public static make(): string {
		return uuidv4();
	}
}
