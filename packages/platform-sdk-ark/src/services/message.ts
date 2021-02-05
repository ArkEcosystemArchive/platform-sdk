import { Crypto } from "@arkecosystem/crypto";
import { Contracts as CryptoContracts, Keys } from "@arkecosystem/crypto-identities";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keys: CryptoContracts.KeyPair = Keys.fromPassphrase(BIP39.normalize(input.mnemonic));

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
