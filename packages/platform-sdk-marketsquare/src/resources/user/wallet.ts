import { Resource } from "../resource";

export class Wallet extends Resource {
	public async show(type: string): Promise<object> {
		return this.get(`wallets/${type}/sync`);
	}

	public async update(type: string, body: object): Promise<void> {
		await this.put(`wallets/${type}/sync`, body);
	}
}
