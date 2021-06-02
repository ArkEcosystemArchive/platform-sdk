import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { getPublicKey, sign, verify } from "noble-ed25519";

import { IdentityService } from "./identity";

export class MessageService extends Services.AbstractMessageService {
	readonly #identityService: IdentityService;

	private constructor(identityService: IdentityService) {
		super();

		this.#identityService = identityService;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(await IdentityService.__construct(config));
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const { privateKey } = await this.#identityService.keyPair().fromMnemonic(input.signatory.signingKey());

			if (privateKey === undefined) {
				throw new Error("Failed to retrieve the private key for the signatory wallet.");
			}

			return {
				message: input.message,
				signatory: await getPublicKey(privateKey),
				signature: await sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, Buffer.from(input.message, "utf8").toString("hex"), input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
