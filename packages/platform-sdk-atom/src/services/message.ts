import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { secp256k1 } from "bcrypto";

import { HashAlgorithms } from "../utils/hash";
import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identityService: IdentityService;

	public constructor(opts: Contracts.KeyValuePair) {
		this.#identityService = opts.identityService;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService({ identityService: await IdentityService.__construct(config) });
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const { publicKey, privateKey } = await this.#identityService
				.keys()
				.fromMnemonic(input.signatory.signingKey());

			return {
				message: input.message,
				signatory: publicKey,
				signature: secp256k1
					.sign(HashAlgorithms.sha256(input.message), Buffoon.fromHex(privateKey))
					.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return secp256k1.verify(
				HashAlgorithms.sha256(input.message),
				Buffoon.fromHex(input.signature),
				Buffoon.fromHex(input.signatory),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
