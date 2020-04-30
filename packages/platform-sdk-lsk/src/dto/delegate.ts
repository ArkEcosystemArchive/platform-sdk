import { Contracts, DTO } from "@arkecosystem/platform-sdk";

export class DelegateData extends DTO.AbstractDelegateData implements Contracts.DelegateData {
	public getAddress(): string {
		return this.data.address;
	}

	public getPublicKey(): string {
		return this.data.publicKey;
	}

	public getUsername(): string {
		return this.data.username;
	}

	public getRank(): number {
		return this.data.rank || 0;
	}
}
