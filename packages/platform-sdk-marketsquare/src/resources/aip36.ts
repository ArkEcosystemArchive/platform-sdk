import * as Models from "../models";
import { Resource } from "./resource";

export class AIP36 extends Resource {
	public async validate(body: Record<string, unknown>): Promise<Models.Response<Models.AIP36>> {
		return this.post("aip36/validate", body);
	}
}
