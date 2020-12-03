import { Resource } from "./resource";

export class AIP36 extends Resource {
	public async validate(body: Record<string, unknown>): Promise<any> {
		return this.post("aip36/validate", body);
	}
}
