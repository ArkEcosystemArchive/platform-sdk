import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

export class DelegateData extends DTO.AbstractDelegateData implements Contracts.DelegateData {
	public getAddress(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getAddress");
	}

	public getPublicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}
}
