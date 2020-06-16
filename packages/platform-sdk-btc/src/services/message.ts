import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
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
		const mnemonic: string = BIP39.normalize(input.mnemonic);
		const privateKey = PrivateKey.fromWIF(mnemonic);
		const message = new Message(input.message);

		return {
			message: input.message,
			signatory: await this.#identity.address().fromWIF(mnemonic),
			signature: message.sign(privateKey),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return new Message(input.message).verify(input.signatory, input.signature);
	}
}
