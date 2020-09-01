import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
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
		try {
			const mnemonic: string = BIP39.normalize(input.mnemonic);
			const privateKey = PrivateKey.fromWIF(mnemonic);
			const message = new Message(input.message);

			return {
				message: input.message,
				signatory: await this.#identity.address().fromWIF(mnemonic),
				signature: message.sign(privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return new Message(input.message).verify(input.signatory, input.signature);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
