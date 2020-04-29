import { DTO } from "@arkecosystem/platform-sdk";

export class DelegateData extends DTO.DelegateData {
	public getAddress(): string {
		return this.data.address;
	}

	public getPublicKey(): string {
		return this.data.publicKey;
	}
}
