import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { ECPair } from "bitcoinjs-lib";
import { sign, verify } from "bitcoinjs-message";

import { IdentityService } from "./identity";

export class MessageService extends Services.AbstractMessageService {
	readonly #identity: IdentityService;

	private constructor(identityService: IdentityService) {
		super();

		this.#identity = identityService;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		const identityService = await IdentityService.__construct(config);

		return new MessageService(identityService);
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const { compressed, privateKey } = ECPair.fromWIF(input.signatory.signingKey());

			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${input.signatory.signingKey()}].`);
			}

			return {
				message: input.message,
				signatory: (await this.#identity.address().fromWIF(input.signatory.signingKey())).address,
				signature: sign(input.message, privateKey, compressed).toString("base64"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(input.message, input.signatory, input.signature);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
