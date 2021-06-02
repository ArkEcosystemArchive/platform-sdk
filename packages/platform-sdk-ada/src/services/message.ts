import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Ed25519Signature, PublicKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { deriveRootKey } from "./identity/shelley";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const privateKey = deriveRootKey(input.signatory.signingKey());

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
