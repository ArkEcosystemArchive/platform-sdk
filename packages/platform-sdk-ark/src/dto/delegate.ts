import { Contracts, DTO } from "@arkecosystem/platform-sdk";

export class DelegateData extends DTO.AbstractDelegateData implements Contracts.DelegateData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string {
		return this.data.publicKey;
	}

	public username(): string {
		return this.data.username;
	}

	public rank(): number {
		return this.data.rank || 0;
	}
}
