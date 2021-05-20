import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const privateKey: string = StellarHDWallet.fromMnemonic(input.signatory.signingKey()).getSecret(0);
			const source = Stellar.Keypair.fromSecret(privateKey);

			return {
				message: input.message,
				signatory: source.publicKey(),
				signature: source.sign(Buffoon.fromUTF8(input.message)).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return Stellar.Keypair.fromPublicKey(input.signatory).verify(
				Buffoon.fromUTF8(input.message),
				Buffoon.fromHex(input.signature),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
