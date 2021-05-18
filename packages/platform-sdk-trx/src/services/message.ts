import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { Buffer } from "buffer";
import TronWeb from "tronweb";

import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identityService: IdentityService;
	readonly #connection: TronWeb;

	private constructor(identityService: IdentityService, peer: string) {
		this.#identityService = identityService;
		this.#connection = new TronWeb({
			fullHost: peer,
		});
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(
			await IdentityService.__construct(config),
			Arr.randomElement(config.get<string[]>("network.networking.hosts")),
		);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			if (!input.mnemonic) {
				throw new Error("No mnemonic provided.");
			}

			const keys: Contracts.KeyPair = await this.#identityService
				.keys()
				.fromMnemonic(BIP39.normalize(input.mnemonic));
			const address = await this.#identityService.address().fromMnemonic(BIP39.normalize(input.mnemonic));

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
