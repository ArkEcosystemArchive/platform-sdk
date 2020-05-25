import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { secp256k1 } from "bcrypto";

import { HashAlgorithms } from "../utils/hash";
import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identityService: IdentityService;

	public constructor(opts: Contracts.KeyValuePair) {
		this.#identityService = opts.identityService;
	}

	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService({ identityService: await IdentityService.construct(config) });
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { publicKey, privateKey } = await this.#identityService.keys().fromMnemonic(input.passphrase);

		return {
			message: input.message,
			signer: publicKey,
			signature: secp256k1
				.sign(HashAlgorithms.sha256(input.message), Buffoon.fromHex(privateKey))
				.toString("hex"),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return secp256k1.verify(
			HashAlgorithms.sha256(input.message),
			Buffoon.fromHex(input.signature),
			Buffoon.fromHex(input.signer),
		);
	}
}
