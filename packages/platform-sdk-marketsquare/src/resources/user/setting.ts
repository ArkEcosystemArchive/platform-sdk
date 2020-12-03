import { Resource } from "../resource";

export class Setting extends Resource {
	public async show(type: string): Promise<object> {
		return this.get(`wallets/${type}/sync`);
	}

	public async store(type: string, body: object): Promise<void> {
		await this.put(`wallets/${type}/sync`, body);
	}
}
