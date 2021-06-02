import { Coins, Contracts, Exceptions, Helpers } from "@arkecosystem/platform-sdk";
import { Buffer } from "buffer";
import TronWeb from "tronweb";

import { IdentityService } from "./identity";

export class MessageService extends Services.AbstractMessageService {
	readonly #identityService: IdentityService;
	readonly #connection: TronWeb;

	private constructor(identityService: IdentityService, peer: string) {
		super();

		this.#identityService = identityService;
		this.#connection = new TronWeb({
			fullHost: peer,
		});
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(await IdentityService.__construct(config), Helpers.randomHostFromConfig(config));
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keys: Contracts.KeyPairDataTransferObject = await this.#identityService
				.keyPair()
				.fromMnemonic(input.signatory.signingKey());
			const { address } = await this.#identityService.address().fromMnemonic(input.signatory.signingKey());

			if (keys.privateKey === undefined) {
				throw new Error("Failed to retrieve the private key for the signatory wallet.");
			}

			const messageAsHex = Buffer.from(input.message).toString("hex");
			const signature = await this.#connection.trx.sign(messageAsHex, keys.privateKey);

			return {
				message: input.message,
				signatory: address,
				signature: signature,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			const messageAsHex = Buffer.from(input.message).toString("hex");
			return this.#connection.trx.verifyMessage(messageAsHex, input.signature, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
