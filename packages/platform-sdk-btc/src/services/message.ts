import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Message, PrivateKey } from "bitcore-lib";

import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identity: IdentityService;

	private constructor(identityService: IdentityService) {
		this.#identity = identityService;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		const identityService = await IdentityService.__construct(config);

		return new MessageService(identityService);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const privateKey = PrivateKey.fromWIF(input.signatory.signingKey());
			const message = new Message(input.message);

			return {
				message: input.message,
				signatory: (await this.#identity.address().fromWIF(input.signatory.signingKey())).address,
				signature: message.sign(privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return new Message(input.message).verify(input.signatory, input.signature);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
