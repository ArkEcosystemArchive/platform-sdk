import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class MessageService implements Contracts.MessageService {
	public async sign(input): Promise<Contracts.SignedMessage> {
		throw new Exceptions.NotImplemented(this.constructor.name, "sign");
	}

	public async verify(input): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, "verify");
	}
}
