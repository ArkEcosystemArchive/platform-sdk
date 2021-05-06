import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Ed25519Signature, PublicKey } from "@emurgo/cardano-serialization-lib-browser";

import { deriveRootKey } from "./identity/shelley";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		if (input.mnemonic === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "sign", "mnemonic");
		}

		try {
			const privateKey = deriveRootKey(BIP39.normalize(input.mnemonic));

			return {
				message: input.message,
				signatory: privateKey.to_public().to_raw_key().to_bech32(),
				signature: privateKey.to_raw_key().sign(Buffer.from(input.message, "utf8")).to_bech32(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return PublicKey.from_bech32(input.signatory).verify(
				Buffer.from(input.message, "utf8"),
				Ed25519Signature.from_bech32(input.signature),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
