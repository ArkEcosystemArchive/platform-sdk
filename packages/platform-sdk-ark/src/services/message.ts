import { Crypto } from "@arkecosystem/crypto";
import { Keys, PublicKey } from "@arkecosystem/crypto-identities";
import { KeyPair } from "@arkecosystem/crypto-identities/dist/contracts";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keys: KeyPair = Keys.fromPassphrase(BIP39.normalize(input.mnemonic));

			return {
				message: input.message,
				signatory: keys.publicKey,
				signature: Crypto.Hash.signSchnorr(Crypto.HashAlgorithms.sha256(input.message), keys),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return Crypto.Hash.verifySchnorr(
				Crypto.HashAlgorithms.sha256(input.message),
				input.signature,
				input.signatory,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
