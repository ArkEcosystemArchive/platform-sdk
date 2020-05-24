import { Coins, Contracts, Utils } from "@arkecosystem/platform-sdk";
import Neon from "@cityofzion/neon-js";
import { wallet } from "@cityofzion/neon-js";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const passphrase: string = BIP39.normalize(input.passphrase);
		const signature = Neon.sign.message(input.message, passphrase);

		return { message: input.message, signer: new wallet.Account(passphrase).publicKey, signature };
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return Neon.verify.message(input.message, input.signature, input.signer);
	}
}
