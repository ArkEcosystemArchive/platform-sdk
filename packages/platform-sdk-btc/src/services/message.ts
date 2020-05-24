import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-support";
import { Message, PrivateKey } from "bitcore-lib";

import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identity: IdentityService;

	private constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public static async construct(config: Coins.Config): Promise<MessageService> {
		const identityService = await IdentityService.construct(config);

		return new MessageService(identityService);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const passphrase: string = BIP39.normalize(input.passphrase);
		const privateKey = PrivateKey.fromWIF(passphrase);
		const message = new Message(input.message);

		return {
			message: input.message,
			signer: await this.#identity.address().fromWIF(passphrase),
			signature: message.sign(privateKey),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return new Message(input.message).verify(input.signer, input.signature);
	}
}
