import { Resource } from "../resource";

export class Setting extends Resource {
	public async show(type: string): Promise<any> {
		return this.get(`wallets/${type}/sync`);
	}

	public async store(type: string, body: object): Promise<any> {
		return this.put(`wallets/${type}/sync`, body);
	}
}
