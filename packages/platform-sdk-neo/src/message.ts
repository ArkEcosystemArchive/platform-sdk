import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Message implements Contracts.Message {
	public sign(input): Contracts.SignedMessage {
		throw new Exceptions.NotImplemented(this.constructor.name, "sign");
	}

	public verify(input): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "verify");
	}
}
